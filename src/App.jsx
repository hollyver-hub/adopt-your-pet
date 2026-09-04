import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import './App.css';

export default function App() {
  const [modoAtivo, setModoAtivo] = useState('mesclar');
  const [arquivos, setArquivos] = useState([]);
  const [paginasInput, setPaginasInput] = useState('');

  const [tipoAssinatura, setTipoAssinatura] = useState('texto');
  const [textoAssinatura, setTextoAssinatura] = useState('');
  const [imagemAssinatura, setImagemAssinatura] = useState(null);
  const [paginaAlvo, setPaginaAlvo] = useState('1');
  const [posicaoX, setPosicaoX] = useState('100');
  const [posicaoY, setPosicaoY] = useState('100');

  useEffect(() => {
    setArquivos([]);
    setPaginasInput('');
    setTextoAssinatura('');
    setImagemAssinatura(null);
    setPaginaAlvo('1');
    setPosicaoX('100');
    setPosicaoY('100');
  }, [modoAtivo]);

  const mesclarPDFs = async () => {
    if (arquivos.length < 2) {
      alert('Por favor, selecione pelo menos dois arquivos PDF para mesclar.');
      return;
    }

    const pdfMesclado = await PDFDocument.create();

    for (const arquivo of arquivos) {
      const arrayBuffer = await arquivo.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const indices = pdf.getPageIndices();
      const paginas = await pdfMesclado.copyPages(pdf, indices);
      paginas.forEach((pagina) => pdfMesclado.addPage(pagina));
    }

    const pdfBytes = await pdfMesclado.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'arquivo_mesclado.pdf';
    link.click();
  }

  const extrairPaginas = async () => {
    if (arquivos.length === 0) {
      alert('Por favor, selecione um arquivo PDF para extrair páginas.');
      return;
    }
    if (!paginasInput) {
      alert('Por favor, insira os números das páginas que deseja extrair.');
      return;
    }
    try {
      const indicesParaExtrair = new Set();
      const partes = paginasInput.split(',');
      for(let parte of partes) {
        parte = parte.trim();
        if (parte.includes('-')){
          const [inicio,fim] = parte.split('-').map(Number);
          for(let i = inicio; i <= fim; i++){
            indicesParaExtrair.add(i-1);
          }
        } else {
          const num = Number(parte);
          if (!isNaN(num) && num > 0) {
            indicesParaExtrair.add(num-1);
          }
        }
      }
      const arrayIndices = Array.from(indicesParaExtrair).sort((a,b) => a-b);

      if (arrayIndices.length === 0){
        alert("Formato de páginas inválido.");
        return;
      }

      const arquivo = arquivos[0];
      const arrayBuffer = await arquivo.arrayBuffer();
      const pdfOriginal = await PDFDocument.load(arrayBuffer);
      const totalPaginas = pdfOriginal.getPageCount();

      const indicesValidos = arrayIndices.filter(i => i < totalPaginas);

      if (indicesValidos.length === 0) {
        alert("Nenhuma das páginas digitadas existe neste PDF.");
        return;
      }

      const pdfNovo = await PDFDocument.create();
      const paginasCopiadas = await pdfNovo.copyPages(pdfOriginal, indicesValidos);
      
      paginasCopiadas.forEach(pagina => pdfNovo.addPage(pagina));

      const pdfBytes = await pdfNovo.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'paginas_extraidas.pdf';
      link.click();

      setArquivos([]);
      setPaginasInput('');
    } catch (error) {
      console.error('Erro ao extrair páginas:', error);
      alert('Ocorreu um erro ao tentar extrair as páginas. Verifique o formato e tente novamente.');
    }
  }

  const assinarPDF = async () => {
    if (arquivos.length === 0) {
      alert('Por favor, selecione um arquivo PDF primeiro.');
      return;
    }

    if (tipoAssinatura === 'texto' && !textoAssinatura) {
      alert('Por favor, digite o texto da assinatura.');
      return;
    }

    if (tipoAssinatura === 'imagem' && !imagemAssinatura) {
      alert('Por favor, selecione uma imagem de assinatura (PNG ou JPG).');
      return;
    }

    try {
      const arrayBufferPdf = await arquivos[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBufferPdf);
      const paginas = pdfDoc.getPages();

      const numPagina = Number(paginaAlvo) - 1;
      if (numPagina < 0 || numPagina >= paginas.length) {
        alert(`A página ${paginaAlvo} não existe neste documento. Total de páginas: ${paginas.length}`);
        return;
      }

      const paginaSelecionada = paginas[numPagina];
      const x = Number(posicaoX) || 100;
      const y = Number(posicaoY) || 100;

      if (tipoAssinatura === 'texto') {
        const fonteCustomizada = await pdfDoc.embedFont(StandardFonts.Helvetica);
        paginaSelecionada.drawText(textoAssinatura, {
          x,
          y,
          size: 14,
          font: fonteCustomizada,
          color: rgb(0, 0, 0),
        });
      } else {
        const arrayBufferImg = await imagemAssinatura.arrayBuffer();
        let imagemEmbed;
        if (imagemAssinatura.type === 'image/png') {
          imagemEmbed = await pdfDoc.embedPng(arrayBufferImg);
        } else {
          imagemEmbed = await pdfDoc.embedJpg(arrayBufferImg);
        }

        paginaSelecionada.drawImage(imagemEmbed, {
          x,
          y,
          width: 120,
          height: 50,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'pdf_assinado.pdf';
      link.click();

      setArquivos([]);
      setTextoAssinatura('');
      setImagemAssinatura(null);
      alert('Assinatura aplicada com sucesso!');
    } catch (error) {
      console.error('Erro ao assinar PDF:', error);
      alert('Ocorreu um erro ao processar a assinatura.');
    }
  };

  return (
    <div className="app-container">
      <section className="header">
        <div className="header-title">
          <h1>Manipulador de PDF</h1>
        </div>
        
        <div className="header-actions">
          <button 
            className={`btn-modo ${modoAtivo === 'mesclar' ? 'ativo' : ''}`}
            onClick={() => setModoAtivo('mesclar')}
          >
           Mesclar PDFs
          </button>
          <button 
            className={`btn-modo ${modoAtivo === 'extrair' ? 'ativo' : ''}`}
            onClick={() => setModoAtivo('extrair')}
          >
             Extrair Páginas
          </button>
          <button 
            className={`btn-modo ${modoAtivo === 'assinar' ? 'ativo' : ''}`}
            onClick={() => setModoAtivo('assinar')}
          >
             Assinar PDF
          </button>
        </div>
      </section>

      <section className="main">
        <div className="calendar">
          <div className="dropzone">
            {arquivos.length > 0 ? (
              <div className="lista-miniaturas">
                {arquivos.map((arquivo, index) => {
  const urlArquivo = URL.createObjectURL(arquivo);
  const ehPaginaAlvo = (index + 1) === Number(paginaAlvo);

  return (
    /* Adicionada a classe condicional 'ampliado' aqui 👇 */
    <div key={index} className={`miniatura-pdf ${modoAtivo === 'assinar' ? 'assinatura' : ''}`}>
      <div className="pdf-wrapper" style={{ position: 'relative' }}>
        <iframe 
          src={`${urlArquivo}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
          title={`Preview ${arquivo.name}`}
          scrolling="no"
        />
        
        {/* Prévia flutuante da assinatura */}
        {modoAtivo === 'assinar' && ehPaginaAlvo && (
          <div style={{
            position: 'absolute',
            /* Ajustado levemente a proporção para acompanhar o tamanho maior */
            left: `${Math.min(Math.max(Number(posicaoX) / 2.5, 10), 180)}px`,
            bottom: `${Math.min(Math.max(Number(posicaoY) / 2.5, 10), 280)}px`,
            pointerEvents: 'none',
            border: '1px dashed #ff4d4f',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '3px 6px',
            borderRadius: '3px',
            maxWidth: '140px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {tipoAssinatura === 'texto' ? (
              <span style={{ fontSize: '10px', color: 'black', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                {textoAssinatura || 'Sua assinatura'}
              </span>
            ) : (
              <span style={{ fontSize: '9px', color: '#666', fontStyle: 'italic' }}>
                {imagemAssinatura ? '🖼️ [Imagem]' : '🖼️ [Sem imagem]'}
              </span>
            )}
          </div>
        )}
      </div>
      <p>{arquivo.name}</p>
    </div>
  );
})}
              </div>
            ) : (
              <>
                <span className="icone-pdf">📄</span>
                <p>
                  {modoAtivo === 'mesclar' && 'Arraste múltiplos PDFs aqui para juntá-los'}
                  {modoAtivo === 'extrair' && 'Arraste um PDF aqui para separar suas páginas'}
                  {modoAtivo === 'assinar' && 'Arraste um PDF aqui para adicionar assinaturas'}
                </p>
              </>
            )}

            <input 
              id="upload-pdf"
              type="file" 
              multiple={modoAtivo === 'mesclar'} 
              accept="application/pdf"
              onChange={(e) => setArquivos(Array.from(e.target.files))}
              style={{ display: 'none' }} 
            />
            <label htmlFor="upload-pdf" className="btn-selecionar" style={{ display: 'inline-block', marginTop: '20px' }}>
              {arquivos.length > 0 ? 'Substituir Arquivos' : 'Procurar Arquivo'}
            </label>
          </div>
        </div>

        <div className="hub">
          <h2>{modoAtivo === 'mesclar' ? 'Opções de Mesclagem' : modoAtivo === 'extrair' ? 'Opções de Extração' : 'Opções de Assinatura'}</h2>
          
          {modoAtivo === 'mesclar' && (
            <div className="hub-card">
              <p>Os arquivos enviados aparecerão aqui. Arraste-os para ajustar a ordem final antes de confirmar.</p>
              
              {arquivos.length > 0 && (
                <p style={{ margin: '15px 0', fontWeight: 'bold', color: 'var(--cor-quaternaria)' }}>
                  📄 {arquivos.length} arquivo(s) selecionado(s).
                </p>
              )}

              <button className="btn-acao" onClick={mesclarPDFs}>
                Juntar e Baixar
              </button>
            </div>
          )}
          {modoAtivo === 'extrair' && (
            <div className="hub-card">
              <p>Digite os números das páginas que deseja manter (ex: 1, 3, 5-8):</p>
              <input 
                type="text" 
                placeholder="Ex: 1-5, 8" 
                className="input-paginas" 
                value={paginasInput}
                onChange={(e) => setPaginasInput(e.target.value)}
              />

              {arquivos.length > 0 && (
                <p style={{ margin: '10px 0', fontSize: '12px', fontWeight: 'bold', color: 'var(--cor-quaternaria)' }}>
                  📄 Arquivo: {arquivos[0].name}
                </p>
              )}

              <button className="btn-acao" style={{marginTop: '15px'}} onClick={extrairPaginas}>
                Extrair e Baixar
              </button>
            </div>
          )}
          {modoAtivo === 'assinar' && (
            <div className="hub-card">
              <p>Escolha como deseja assinar o documento:</p>
              
              <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                <button 
                  type="button"
                  className={`btn-acao ${tipoAssinatura === 'texto' ? '' : 'btn-secundario'}`} 
                  onClick={() => setTipoAssinatura('texto')}
                  style={{ padding: '6px', fontSize: '12px' }}
                >
                  Com Texto
                </button>
                <button 
                  type="button"
                  className={`btn-acao ${tipoAssinatura === 'imagem' ? '' : 'btn-secundario'}`} 
                  onClick={() => setTipoAssinatura('imagem')}
                  style={{ padding: '6px', fontSize: '12px' }}
                >
                  Com Imagem
                </button>
              </div>

              {tipoAssinatura === 'texto' ? (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Texto da Assinatura:</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Assinado por Nome" 
                    className="input-paginas" 
                    value={textoAssinatura}
                    onChange={(e) => setTextoAssinatura(e.target.value)}
                  />
                </div>
              ) : (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Arquivo de Imagem (PNG/JPG):</label>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg"
                    onChange={(e) => setImagemAssinatura(e.target.files[0])}
                    style={{ fontSize: '12px' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block' }}>Página:</label>
                  <input 
                    type="number" 
                    min="1" 
                    className="input-paginas" 
                    value={paginaAlvo}
                    onChange={(e) => setPaginaAlvo(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block' }}>Pos X:</label>
                  <input 
                    type="number" 
                    className="input-paginas" 
                    value={posicaoX}
                    onChange={(e) => setPosicaoX(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block' }}>Pos Y:</label>
                  <input 
                    type="number" 
                    className="input-paginas" 
                    value={posicaoY}
                    onChange={(e) => setPosicaoY(e.target.value)}
                  />
                </div>
              </div>

              {arquivos.length > 0 && (
                <p style={{ margin: '8px 0', fontSize: '12px', fontWeight: 'bold', color: 'var(--cor-quaternaria)' }}>
                  📄 Arquivo: {arquivos[0].name}
                </p>
              )}

              <button className="btn-acao" onClick={assinarPDF} style={{marginTop: '5px'}}>
                Aplicar Assinatura e Baixar
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="footer">
        <p>Site desenvolvido para obtenção de nota da disciplina de Programação Web 1 - Sistemas de Informação.</p>
      </section>
    </div>
  );
}
import './styles/App.css';
import { Banner } from './components/banner.jsx';
import { About } from './components/about.jsx';
import { Steps } from './components/step-step.jsx';
import { PetsCarousel } from './components/pets-carousel.jsx';
import { Footer } from './components/footer.jsx';

function App() {
  return (
    <div className="body">
      <Banner />
      <About />
      <Steps />
      <PetsCarousel />
      <Footer />
    </div>
  );
}

export default App;
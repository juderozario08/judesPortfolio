import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-tokyo-base text-tokyo-fg selection:bg-tokyo-purple selection:text-tokyo-base">
      {/* Moving Grid Background */}
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-50"></div>
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;

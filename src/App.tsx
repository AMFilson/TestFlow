import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

function AmbientContainer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 blur-[100px]">
      <div 
        className="absolute rounded-full blur-[60px] animate-[drift_20s_infinite_alternate_ease-in-out]"
        style={{
            width: '690px', height: '600px', 
            background: 'radial-gradient(circle at 30% 30%, #bd6b73 0%, #a30037 50%, transparent 70%)',
            top: '-10%', left: '-10%', animationDelay: '0s',
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }} 
      />
      <div 
        className="absolute rounded-full blur-[60px] animate-[drift_20s_infinite_alternate_ease-in-out]"
        style={{
            width: '500px', height: '500px', 
            background: 'radial-gradient(circle at 70% 70%, #c6b6e6 0%, #bbb6df 50%, transparent 70%)',
            bottom: '-10%', right: '-5%', animationDelay: '-5s',
            transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`
        }} 
      />
      <div 
        className="absolute rounded-full blur-[60px] animate-[drift_20s_infinite_alternate_ease-in-out]"
        style={{
            width: '400px', height: '400px', 
            background: 'radial-gradient(circle at 50% 50%, #d8d6f0 0%, #c6c6ee 50%, transparent 70%)',
            top: '30%', right: '20%', animationDelay: '-10s',
            transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`
        }} 
      />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="absolute top-0 left-0 w-full px-12 py-8 flex justify-between items-center z-[100]">
      <div className="font-mono font-medium text-[0.85rem] tracking-[0.2em] uppercase">Testflow_</div>
      <div className="font-mono text-[0.7rem] text-[#333] flex gap-8">
      </div>
      <div></div>
    </nav>
  );
}

function UrlInterface({ activeSegment, setActiveSegment }: { activeSegment: string, setActiveSegment: (v: string) => void }) {
  return (
    <div className="col-span-2 flex justify-center items-center mb-4">
      <div className="bg-white/55 backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] rounded-full py-2 pr-2 pl-8 flex items-center w-[690px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:w-[793px] focus-within:bg-white/80 group">
        <input 
            type="text" 
            placeholder="Paste source URL or research link..." 
            defaultValue="https://nature.org/biology/neuro-sculpture"
            className="bg-transparent border-none outline-none flex-1 font-newsreader text-[1.2rem] text-black w-full"
        />
        <div className="flex bg-[rgba(240,240,245,0.85)] rounded-full p-1 gap-1 shrink-0 relative">
          {['Guide', 'Quiz', 'Export'].map((item) => (
             <button 
                key={item}
                onClick={() => setActiveSegment(item)}
                className={`relative border-none bg-transparent py-[0.6rem] px-[1.2rem] rounded-full font-inter text-[0.85rem] font-medium transition-colors duration-300 z-10 ${activeSegment === item ? 'text-black' : 'text-[#333] hover:text-black'}`}
             >
               {activeSegment === item && (
                 <motion.div 
                   layoutId="active-pill"
                   className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                   style={{ zIndex: -1 }}
                   transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                 />
               )}
               {item}
             </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizPanel({ isExpanded, isGenerating, onToggle }: { isExpanded: boolean, isGenerating: boolean, onToggle: () => void }) {
  return (
    <aside className={`bg-white/55 backdrop-blur-[24px] border border-[rgba(255,255,255,0.6)] rounded-[32px] p-8 flex flex-col gap-6 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-full' : 'max-h-[280px]'}`}>
       <div className="flex justify-between items-end mb-4">
           <h2 className="font-newsreader text-2xl font-normal text-black">{isExpanded ? 'Active Quiz' : 'Ready for Quiz'}</h2>
           <div className="font-mono text-[0.65rem] px-2 py-1 border border-black rounded-[4px] uppercase">LIVE</div>
       </div>

       <div className={`mt-auto py-4 ${isExpanded ? 'hidden' : 'block'}`}>
           <span className="font-mono text-[0.6rem] text-[#333] uppercase">Status</span>
           <p className="text-[0.85rem] mt-2 leading-[1.4] text-[#333]">No quiz generated. Enter a source URL and click "Build Quiz" to create an interactive assessment.</p>
       </div>

       <div className={`bg-white/30 rounded-2xl p-5 border border-[rgba(189,107,115,0.25)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden m-0 p-0 border-none'}`}>
           <span className="font-mono text-[0.6rem] text-[#333] uppercase">Retention Score</span>
           <div className="font-newsreader text-2xl text-[#c6b6e6] mt-1">94%</div>
           <div className="flex gap-[2px] mt-2">
               {[1,2,3,4,5,6].map(i => (
                   <div key={i} className={`h-1 flex-1 rounded-[1px] ${i <= 5 ? 'bg-[#bd6b73]' : 'bg-[rgba(0,0,0,0.05)]'}`} />
               ))}
           </div>
       </div>

       <div className={`grid grid-cols-2 gap-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'opacity-100 max-h-[500px] mt-4' : 'opacity-0 max-h-0 overflow-hidden m-0'}`}>
           <div className="bg-white/30 rounded-2xl p-5 border border-[rgba(189,107,115,0.25)] flex flex-col gap-1">
               <span className="font-mono text-[0.6rem] text-[#333] uppercase">Correct</span>
               <span className="font-newsreader text-[1.4rem]">18/20</span>
           </div>
           <div className="bg-white/30 rounded-2xl p-5 border border-[rgba(189,107,115,0.25)] flex flex-col gap-1">
               <span className="font-mono text-[0.6rem] text-[#333] uppercase">Time</span>
               <span className="font-newsreader text-[1.4rem]">04:12</span>
           </div>
       </div>

       {isExpanded && (
           <div className="mt-auto border border-dashed border-[#333] bg-white/30 rounded-2xl p-5 transition-all duration-600">
               <span className="font-mono text-[0.6rem] text-[#333] uppercase">System Note</span>
               <p className="text-[0.75rem] mt-2 leading-[1.4]">User is demonstrating high proficiency in "Neural Plasticity" concepts. Recommend increasing quiz complexity.</p>
           </div>
       )}
    </aside>
  );
}

function StudyPanel({ isExpanded, isGenerating }: { isExpanded: boolean, isGenerating: boolean }) {
  return (
    <section className={`content-area bg-white/45 backdrop-blur-[24px] border border-[rgba(255,255,255,0.6)] rounded-[32px] p-8 overflow-y-auto relative transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-full w-full' : 'max-h-[280px] w-[320px]'}`}>

       
       <header className="mb-8 max-w-[600px]">
           <h2 className={`font-newsreader mb-4 leading-tight transition-all duration-600 ${isExpanded ? 'text-2xl italic text-black' : 'text-2xl font-normal text-[#333]'}`}>
               {isExpanded ? 'Neuro-Sculpture and Kinetic Learning' : 'Ready to Generate'}
           </h2>
           <p className="text-[0.95rem] text-[#333] leading-[1.6]">
               {isExpanded ? 
                'An examination of how generative sound environments facilitate deeper memory encoding and semantic mapping in the mammalian brain. Use both panels to study and test your knowledge.' : 
                'Enter a source URL and click Generate to create your personalized study guide. The system will analyze the content and build an interactive learning experience.'}
           </p>
       </header>

       <div className={`grid grid-cols-2 gap-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded && !isGenerating ? 'opacity-100 translate-y-0 max-h-[2000px]' : 'opacity-0 translate-y-5 max-h-0 overflow-hidden pointer-events-none'}`}>
           <div className="p-6 border-t-[0.5px] border-black/10">
               <span className="font-mono text-[0.65rem] text-[#333] mb-4 block">01 / CONCEPTUAL_BASE</span>
               <h3 className="font-newsreader text-xl mb-3">The Auditory Loop</h3>
               <p className="text-[0.85rem] leading-[1.6] text-[#333]">Phonological storage depends on rhythmic consistency. When sound is generative, it prevents habituation, keeping the prefrontal cortex in a state of "active novelty."</p>
           </div>
           <div className="p-6 border-t-[0.5px] border-black/10">
               <span className="font-mono text-[0.65rem] text-[#333] mb-4 block">02 / DATA_MAPPING</span>
               <h3 className="font-newsreader text-xl mb-3">Spatial Memory Anchors</h3>
               <p className="text-[0.85rem] leading-[1.6] text-[#333]">By placing study concepts within a 3D soundscape, learners can use vestigial spatial navigation skills to "walk through" complex information hierarchies.</p>
           </div>
           <div className="p-6 border-t-[0.5px] border-black/10">
               <span className="font-mono text-[0.65rem] text-[#333] mb-4 block">03 / APPLICATION</span>
               <h3 className="font-newsreader text-xl mb-3">Kinetic Encoding</h3>
               <p className="text-[0.85rem] leading-[1.6] text-[#333]">The interface isn't just a display; it's a living organism. Interactions create micro-tonal shifts that act as mnemonic triggers during recall sessions.</p>
           </div>
           <div className="p-6 border-t-[0.5px] border-black/10">
               <span className="font-mono text-[0.65rem] text-[#333] mb-4 block">04 / SUMMARY</span>
               <h3 className="font-newsreader text-xl mb-3">Synthesis of Form</h3>
               <p className="text-[0.85rem] leading-[1.6] text-[#333]">Final synthesis suggests that 90% of subjects using "Ethereal UI" environments showed a 14% increase in long-term retention versus standard text-based portals.</p>
           </div>
       </div>
    </section>
  );
}

export default function App() {
  const [activeSegment, setActiveSegment] = useState('Guide');
  const [isQuizExpanded, setIsQuizExpanded] = useState(false);
  const [isQuizGenerating, setIsQuizGenerating] = useState(false);
  const [isStudyExpanded, setIsStudyExpanded] = useState(false);
  const [isStudyGenerating, setIsStudyGenerating] = useState(false);

  const toggleQuiz = () => {
      if (!isQuizExpanded) {
          setIsQuizGenerating(true);
          setTimeout(() => {
              setIsQuizExpanded(true);
              setIsQuizGenerating(false);
          }, 1500);
      } else {
          setIsQuizExpanded(false);
      }
  };

  const toggleStudyGuide = () => {
      if (!isStudyExpanded) {
          setIsStudyGenerating(true);
          setTimeout(() => {
              setIsStudyExpanded(true);
              setIsStudyGenerating(false);
          }, 1500);
      } else {
          setIsStudyExpanded(false);
      }
  };

  return (
    <>
      <AmbientContainer />
      <NavBar />
      
      <main className="grid grid-cols-[320px_320px] justify-center h-screen px-12 pt-32 pb-24 gap-8 grid-rows-[auto_1fr] relative">
        <UrlInterface activeSegment={activeSegment} setActiveSegment={setActiveSegment} />
        
        <QuizPanel 
            isExpanded={isQuizExpanded} 
            isGenerating={isQuizGenerating} 
            onToggle={toggleQuiz} 
        />
        
        <StudyPanel 
            isExpanded={isStudyExpanded} 
            isGenerating={isStudyGenerating} 
        />
      </main>

      <div className={`fixed bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all opacity-0 ${isStudyGenerating ? '!opacity-100 pointer-events-auto' : 'pointer-events-none'}`}>
          <div className="w-2 h-2 bg-[#bd6b73] rounded-full animate-[pulse-custom_1.5s_infinite]" />
          <span className="font-mono text-[0.75rem] text-[#333]">Generating study guide...</span>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1000]">
        <button 
            onClick={toggleStudyGuide}
            className={`bg-black text-white border-none py-[1.2rem] px-10 rounded-full font-inter font-semibold text-[0.9rem] flex items-center gap-4 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[5px] hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:bg-black ${isStudyGenerating ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
            <div className={`w-5 h-5 rounded-full transition-colors`} style={{ background: isStudyExpanded ? '#c6b6e6' : '#bd6b73' }}></div>
            {isStudyExpanded ? 'Collapse Guide' : 'Generate Study Guide'}
        </button>
      </div>
    </>
  );
}


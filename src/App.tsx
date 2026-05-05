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
    <nav className="absolute top-0 left-0 w-full px-12 py-8 flex justify-between items-center z-[100] text-[16px]">
      <div className="font-mono font-medium text-[0.85rem] tracking-[0.2em] uppercase">Testflow_</div>
      <div className="font-mono text-[0.7rem] text-[#333] flex gap-8">
      </div>
      <div className="font-mono text-[0.7rem] text-[#333] uppercase">MADE BY: ANDREW FILSON</div>
    </nav>
  );
}

function UrlInterface({ activeSegment, setActiveSegment }: { activeSegment: string, setActiveSegment: (v: string) => void }) {
  return (
    <div className="col-span-2 flex justify-center items-center mb-4">
      <div className="bg-white/55 backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] rounded-full py-2 pr-2 pl-8 flex items-center w-[750px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] has-[input:focus]:w-[850px] has-[input:focus]:bg-white/80 group">
        <input 
            type="text" 
            placeholder="Paste source URL or research link..." 
            defaultValue="https://nature.org/biology/neuro-sculpture"
            className="bg-transparent border-none outline-none flex-1 font-newsreader text-[1.2rem] text-black w-full"
        />
        <div className="flex items-center gap-1 shrink-0">
          <div className="flex bg-[rgba(240,240,245,0.85)] rounded-full p-1 gap-1 relative">
            {['Guide', 'Quiz'].map((item) => (
               <button 
                  key={item}
                  onClick={() => setActiveSegment(item)}
                  className={`relative border-none bg-transparent py-[0.6rem] w-[80px] flex items-center justify-center rounded-full font-inter text-[0.85rem] font-medium transition-colors duration-300 z-10 ${activeSegment === item ? 'text-black' : 'text-[#333] hover:text-black'}`}
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
          <button 
            onClick={() => setActiveSegment('Export')}
            className="relative border-none bg-transparent py-[0.6rem] w-[80px] flex items-center justify-center rounded-full font-inter text-[0.85rem] font-medium text-[#333] hover:text-black transition-colors duration-300 z-10"
          >
             Export
          </button>
        </div>
      </div>
    </div>
  );
}

function QuizPanel({ isExpanded, isGenerating, onToggle }: { isExpanded: boolean, isGenerating: boolean, onToggle: () => void }) {
  return (
    <aside className={`bg-white/55 backdrop-blur-[24px] border border-[rgba(255,255,255,0.6)] rounded-[32px] p-8 flex flex-col gap-6 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-full w-full' : 'h-[280px] w-[320px]'}`}>
       <div className="flex justify-between items-end mb-4">
           <h2 className="font-newsreader text-2xl font-normal text-black">Interactive Quiz</h2>
       </div>

       <div className={`mt-auto py-4 ${isExpanded ? 'hidden' : 'block'}`}>
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
    <section className={`content-area bg-white/45 backdrop-blur-[24px] border border-[rgba(255,255,255,0.6)] rounded-[32px] p-8 relative transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-full w-full overflow-y-auto' : 'h-[280px] w-[320px] overflow-hidden'}`}>
 
       
       <header className="mb-8 max-w-[600px]">
           <h2 className={`font-newsreader mb-4 leading-tight transition-all duration-600 ${isExpanded ? 'text-2xl italic text-black' : 'text-2xl font-normal text-[#333]'}`}>
               Study Guide
           </h2>
           {isExpanded && (
               <p className="text-[0.95rem] text-[#333] leading-[1.6]">
                   An examination of how generative sound environments facilitate deeper memory encoding and semantic mapping in the mammalian brain. Use both panels to study and test your knowledge.
               </p>
           )}
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

function IntroSection() {
  return (
    <div className="flex-1 min-w-[500px] h-[600px] bg-white/30 backdrop-blur-[10px] border border-white/20 rounded-[32px] p-10 flex flex-col relative overflow-hidden transition-all duration-1000 animate-in fade-in slide-in-from-right-10">
      <div className="z-10 flex flex-col gap-4 w-full">
        <h3 className="font-mono text-[0.7rem] text-[#333] tracking-[0.15em] uppercase">System Instructions</h3>
        <p className="font-newsreader text-[1.1rem] leading-[1.6] text-black">
          Enter a source URL or upload a pdf file Select one of the 3 modes and click generate.
        </p>
        <ul className="flex flex-col gap-3 mt-4">
          {['Guide -> Create a personalized study guide', 'Quiz -> Create an interactive quiz', 'Export -> Download a copy of your study guide'].map((step, idx) => (
            <li key={idx} className="flex items-center gap-3 text-[0.8rem] text-[#444]">
              <span className="w-4 h-[1px] bg-black/20" />
              {step}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto z-10">
         <div className="w-full h-[320px] bg-black/5 rounded-2xl border border-white/40 flex items-center justify-center group cursor-pointer relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#bd6b73]/5 to-[#c6b6e6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1" />
              </div>
              <span className="font-mono text-[0.65rem] text-[#333] tracking-widest uppercase">Watch Platform Overview</span>
            </div>
            
            {/* Abstract motion elements for "animated video" feel */}
            <div className="absolute bottom-6 right-6 w-32 h-32 border border-black/5 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#c6b6e6]/10 rounded-full blur-xl" />
         </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#bd6b73]/5 to-[#c6b6e6]/5 rounded-full blur-[100px] -z-10" />
    </div>
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
      
      <main className={`flex flex-col h-screen px-12 pt-32 pb-24 gap-8 relative transition-all duration-700 ${!isQuizExpanded && !isStudyExpanded ? 'items-start' : 'items-center'}`}>
        <div className="w-full flex justify-center transition-all duration-700">
          <UrlInterface activeSegment={activeSegment} setActiveSegment={setActiveSegment} />
        </div>
        
        <div className={`w-full flex gap-12 transition-all duration-700 ${!isQuizExpanded && !isStudyExpanded ? 'flex-row items-center justify-center' : 'flex-col items-center'}`}>
          <div className={`flex flex-col gap-8 transition-all duration-700 ${!isQuizExpanded && !isStudyExpanded ? 'items-start shrink-0' : 'items-center w-full'}`}>
            <div className={`transition-all duration-700 ${isStudyExpanded ? 'w-full flex justify-center' : 'w-auto'}`}>
            <StudyPanel 
                isExpanded={isStudyExpanded} 
                isGenerating={isStudyGenerating} 
            />
          </div>

            <div className={`transition-all duration-700 ${isQuizExpanded ? 'w-full flex justify-center' : 'w-auto'}`}>
            <QuizPanel 
                isExpanded={isQuizExpanded} 
                isGenerating={isQuizGenerating} 
                onToggle={toggleQuiz} 
            />
          </div>
        </div>

          {(!isQuizExpanded && !isStudyExpanded) && (
            <div className="flex-1 max-w-[800px] animate-in fade-in slide-in-from-right-20 duration-1000">
              <IntroSection />
            </div>
          )}
        </div>
      </main>

      <div className={`fixed bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all opacity-0 ${(isStudyGenerating || isQuizGenerating) ? '!opacity-100 pointer-events-auto' : 'pointer-events-none'}`}>
          <div className="w-2 h-2 bg-[#bd6b73] rounded-full animate-[pulse-custom_1.5s_infinite]" />
          <span className="font-mono text-[0.75rem] text-[#333]">
              {isStudyGenerating ? 'Generating study guide...' : 'Building interactive quiz...'}
          </span>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1000]">
        <button 
            onClick={activeSegment === 'Guide' ? toggleStudyGuide : (activeSegment === 'Quiz' ? toggleQuiz : undefined)}
            className={`bg-black text-white border-none py-[1.2rem] px-10 rounded-full font-inter font-semibold text-[0.9rem] flex items-center gap-4 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[5px] hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:bg-black ${(activeSegment === 'Guide' ? isStudyGenerating : isQuizGenerating) ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
            <div className={`w-5 h-5 rounded-full transition-colors`} style={{ background: (activeSegment === 'Guide' ? isStudyExpanded : isQuizExpanded) ? '#c6b6e6' : '#bd6b73' }}></div>
            {activeSegment === 'Guide' ? (isStudyExpanded ? 'Collapse Guide' : 'Generate Study Guide') : 
             activeSegment === 'Quiz' ? (isQuizExpanded ? 'Collapse Quiz' : 'Generate Quiz') : 
             'Export Now'}
        </button>
      </div>
    </>
  );
}


/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Play, Copy, Trash2, Code2, Download, Terminal, Sparkles } from 'lucide-react';
import './CodeCompiler.css';
import axios from 'axios';
import ButtomNav from './ButtomNav';

const CodeCompiler = () => {
   const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const languageTemplates = {
    python: `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
print("Welcome to Code Compiler!")`,
    java: `// Java Example
public class Main {
    public static void main(String[] args) {
        String message = "Hello, World!";
        System.out.println(message);
        System.out.println("Welcome to Code Compiler!");
    }
}`,
    c: `// C Example
#include <stdio.h>

int main() {
    char name[] = "World";
    printf("Hello, %s!\\n", name);
    printf("Welcome to Code Compiler!\\n");
    return 0;
}`
  };

  const languageColors = {
    python: { bg: 'python-bg', glow: 'python-glow', icon: '🐍' },
    java: { bg: 'java-bg', glow: 'java-glow', icon: '☕' },
    c: { bg: 'c-bg', glow: 'c-glow', icon: '⚡' }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(languageTemplates[lang]);
    setOutput('');
  };

  const executeCode = async () => {
     setLoading(true);
    setOutput('');
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/compile', { code, language, input });
      setOutput(response.data.output);
      setError(response.data.error);
    } catch (err) {
      setError('Error running code: ' + err.message);
    }
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const extensions = { python: 'py', java: 'java', c: 'c' };
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extensions[language]}`;
    a.click();
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
  };

  return (
    <div className="code-compiler-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
      </div>

      {/* Main Container */}
      <div className="main-wrapper">
        {/* Header */}
        <div className="header-section">
          <div className="header-container">
            <div className="header-content">
              <Code2 className="header-icon header-icon-left" />
              <h1 className="main-title">SAVS Code Compiler </h1>
              <Sparkles className="header-icon header-icon-right" />
            </div>
            <p className="subtitle">
              Write, compile, and execute code in real-time
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="language-section">
          <div className="language-container">
            <div className="language-grid">
              {Object.keys(languageTemplates).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`language-card ${language === lang ? `${languageColors[lang].bg} active-language ${languageColors[lang].glow}` : ''}`}
                >
                  <div className="language-icon">{languageColors[lang].icon}</div>
                  <h3 className="language-name">{lang.toUpperCase()}</h3>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor Section */}
        <div className="editor-section">
          <div className="editor-container">
            <div className="main-editor">
              
              {/* Toolbar */}
              <div className="editor-toolbar">
                <div className="toolbar-content">
                  
                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button
                      onClick={copyCode}
                      className="action-button"
                    >
                      <Copy className="button-icon" />
                      <span className="button-text">Copy</span>
                    </button>
                    <button
                      onClick={downloadCode}
                      className="action-button"
                    >
                      <Download className="button-icon" />
                      <span className="button-text">Download</span>
                    </button>
                    <button
                      onClick={clearCode}
                      className="action-button"
                    >
                      <Trash2 className="button-icon" />
                      <span className="button-text">Clear</span>
                    </button>
                  </div>

                  {/* Run Button */}
                  <button
                    onClick={executeCode}
                    disabled={loading}
                    className={`run-button ${languageColors[language].bg} ${loading ? 'loading' : ''}`}
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span className="run-text">Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="play-icon" />
                        <span className="run-text">Run Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Editor and Output Grid */}
              <div className="editor-output-grid">
                
                {/* Code Editor */}
                <div className="code-editor-panel">
                  
                  <div className="editor-content">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="code-textarea"
                      placeholder="Write your code here..."
                      spellCheck="false"
                    />
                  </div>
                </div>

                {/* Output Panel */}
                <div className="output-panel">
                  <div className="output-header">
                    <Terminal className="output-icon" />
                    <span className="output-title">Console Output</span>
                    <div className="status-indicators">
                      <div className="status-dot"></div>
                      <div className="status-dot dot-delay-1"></div>
                      <div className="status-dot dot-delay-2"></div>
                    </div>
                  </div>
                  <div className="output-content">
                    <div className="output-display">
                      <pre className="output-text">
                        {output || (
                          <span className="placeholder-text">
                            {'> '} Click 'Run Code' to see output here...
                            {'\n> '} Waiting for execution...
                          </span>
                        )}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
      <ButtomNav/>
    </div>
  );
};

export default CodeCompiler;



// import React, { useState, useEffect } from 'react';
// import { Play, Copy, Trash2, Code2, Download, Terminal, Sparkles, CheckCircle } from 'lucide-react';
// import './CodeCompiler.css';

// const CodeCompiler = () => {
//   const [code, setCode] = useState('print("Hello, World!")');
//   const [language, setLanguage] = useState('python');
//   const [output, setOutput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);
//   // eslint-disable-next-line no-unused-vars
//   const [isMobile, setIsMobile] = useState(false);

//   // Check screen size for responsive behavior
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const languageTemplates = {
//     python: `# Python Example
// def greet(name):
//     return f"Hello, {name}!"

// print(greet("World"))
// print("Welcome to Code Compiler!")`,
//     java: `// Java Example
// public class Main {
//     public static void main(String[] args) {
//         String message = "Hello, World!";
//         System.out.println(message);
//         System.out.println("Welcome to Code Compiler!");
//     }
// }`,
//     c: `// C Example
// #include <stdio.h>

// int main() {
//     char name[] = "World";
//     printf("Hello, %s!\\n", name);
//     printf("Welcome to Code Compiler!\\n");
//     return 0;
// }`
//   };

//   const languageColors = {
//     python: { 
//       bg: 'python-bg', 
//       text: 'python-text',
//       icon: '🐍'
//     },
//     java: { 
//       bg: 'java-bg', 
//       text: 'java-text',
//       icon: '☕'
//     },
//     c: { 
//       bg: 'c-bg', 
//       text: 'c-text',
//       icon: '⚡'
//     }
//   };

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang);
//     setCode(languageTemplates[lang]);
//     setOutput('');
//   };

//   const executeCode = async () => {
//     setIsLoading(true);
//     setOutput('🚀 Initializing execution environment...\n⚙️  Compiling code...\n');

//     // Simulated execution for demo purposes
//     setTimeout(() => {
//       const simulatedOutputs = {
//         python: `✅ Execution completed successfully!\n\nHello, World!\nWelcome to Code Compiler!`,
//         java: `✅ Execution completed successfully!\n\nHello, World!\nWelcome to Code Compiler!`,
//         c: `✅ Execution completed successfully!\n\nHello, World!\nWelcome to Code Compiler!`
//       };
      
//       setOutput(simulatedOutputs[language]);
//       setIsLoading(false);
//     }, 1500);
//   };

//   const copyCode = () => {
//     navigator.clipboard.writeText(code);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };

//   const downloadCode = () => {
//     const extensions = { python: 'py', java: 'java', c: 'c' };
//     const blob = new Blob([code], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `code.${extensions[language]}`;
//     a.click();
//   };

//   const clearCode = () => {
//     setCode('');
//     setOutput('');
//   };

//   return (
//     <div className="code-compiler-container">
//       {/* Animated Background Elements */}
//       <div className="animated-background">
//         <div className="bg-element bg-element-1"></div>
//         <div className="bg-element bg-element-2"></div>
//         <div className="bg-element bg-element-3"></div>
//       </div>

//       {/* Grid Pattern Overlay */}
//       <div className="grid-overlay"></div>

//       {/* Main Container */}
//       <div className="main-container">
//         <div className="content-wrapper">
          
//           {/* Header */}
//           <div className="header-section">
//             <div className="header-icons">
//               <div className="icon-wrapper">
//                 <div className="icon-glow"></div>
//                 <Code2 className="header-icon" />
//               </div>
//               <h1 className="main-title">SAVS Code Compiler</h1>
//               <div className="icon-wrapper">
//                 <div className="icon-glow purple-glow"></div>
//                 <Sparkles className="header-icon" />
//               </div>
//             </div>
//             <p className="subtitle">
//               Write, compile, and execute code in multiple languages with real-time results
//             </p>
//           </div>

//           {/* Language Selector */}
//           <div className="language-selector">
//             <div className="language-grid">
//               {Object.keys(languageTemplates).map((lang) => (
//                 <button
//                   key={lang}
//                   onClick={() => handleLanguageChange(lang)}
//                   className={`language-card ${language === lang ? `${languageColors[lang].bg} active-language` : ''}`}
//                 >
//                   <div className="language-icon">{languageColors[lang].icon}</div>
//                   <h3 className="language-name">{lang.charAt(0).toUpperCase() + lang.slice(1)}</h3>
//                   <p className="language-version">
//                     {lang === 'python' ? '' : lang === 'java' ? '' : lang === 'c' ? '' : ''}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className="main-content">
            
//             {/* Code Editor Section */}
//             <div className="editor-section">
//               <div className="editor-container">
                
//                 {/* Editor Header */}
//                 <div className="editor-header">
//                   <div className="editor-header-content">
                    
//                     {/* Editor Actions */}
//                     <div className="editor-actions">
//                       <button
//                         onClick={copyCode}
//                         className="action-button copy-button"
//                       >
//                         {isCopied ? (
//                           <>
//                             <CheckCircle className="action-icon" />
//                             <span className="action-text">Copied!</span>
//                           </>
//                         ) : (
//                           <>
//                             <Copy className="action-icon" />
//                             <span className="action-text">Copy</span>
//                           </>
//                         )}
//                       </button>
//                       <button
//                         onClick={downloadCode}
//                         className="action-button"
//                       >
//                         <Download className="action-icon" />
//                         <span className="action-text">Download</span>
//                       </button>
//                       <button
//                         onClick={clearCode}
//                         className="action-button"
//                       >
//                         <Trash2 className="action-icon" />
//                         <span className="action-text">Clear</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Code Textarea */}
//                 <div className="code-area-container">
//                   <div className="code-textarea-wrapper">
//                     <div className="line-numbers">
//                       <span className="line-number">1</span>
//                       <span className="line-number">2</span>
//                       <span className="line-number">3</span>
//                       <span className="line-number">4</span>
//                       <span className="line-number">5</span>
//                     </div>
//                     <textarea
//                       value={code}
//                       onChange={(e) => setCode(e.target.value)}
//                       className="code-textarea"
//                       placeholder="Write your code here..."
//                       spellCheck="false"
//                     />
//                     <div className="language-indicator">
//                       <div className={`language-badge ${languageColors[language].text}`}>
//                         {language}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Output Section */}
//             <div className="output-section">
//               <div className="output-container">
                
//                 {/* Output Header */}
//                 <div className="output-header">
//                   <div className="output-header-content">
//                     <div className="output-title-section">
//                       <div className="output-icon-wrapper">
//                         <div className="output-icon-glow"></div>
//                         <Terminal className="output-icon" />
//                       </div>
//                       <span className="output-title">Output Console</span>
//                       <div className="status-indicators">
//                         <div className="status-dot"></div>
//                         <div className="status-dot delay-1"></div>
//                         <div className="status-dot delay-2"></div>
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={executeCode}
//                       disabled={isLoading}
//                       className={`run-button ${languageColors[language].bg} ${isLoading ? 'loading' : ''}`}
//                     >
//                       {isLoading ? (
//                         <>
//                           <div className="loading-spinner"></div>
//                           <span>Running...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Play className="play-icon" />
//                           <span>Run Code</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Output Content */}
//                 <div className="output-content-container">
//                   <div className="output-content-wrapper">
//                     <div className="output-background"></div>
//                     <div className="output-display">
//                       <div className="output-scroll">
//                         <pre className="output-text">
//                           {output ? (
//                             <div className="output-lines">
//                               {output.split('\n').map((line, index) => (
//                                 <div key={index} className={`output-line ${line.startsWith('✅') ? 'success' : line.startsWith('❌') ? 'error' : 'normal'}`}>
//                                   <span className="output-prompt">{'>'}</span>
//                                   {line}
//                                 </div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="empty-output">
//                               <Terminal className="empty-icon" />
//                               <h3 className="empty-title">No Output Yet</h3>
//                               <p className="empty-message">
//                                 Write your code and click "Run Code" to see the execution results here.
//                               </p>
//                             </div>
//                           )}
//                         </pre>
//                       </div>
                      
//                       {/* Output Stats */}
//                       {output && (
//                         <div className="output-stats">
//                           <div className="stats-content">
//                             <span>Lines: {output.split('\n').length}</span>
//                             <span>Language: {language}</span>
//                             <span>Status: {output.includes('✅') ? 'Success' : 'Error'}</span>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="footer">
//             <p className="footer-text">
//               Built with React • Powered by Simulated Execution • Works in all modern browsers
//             </p>
//             <div className="footer-features">
//               <span>Auto-save enabled</span>
//               <span className="separator">•</span>
//               <span>Syntax highlighting</span>
//               <span className="separator">•</span>
//               <span>Real-time preview</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeCompiler;





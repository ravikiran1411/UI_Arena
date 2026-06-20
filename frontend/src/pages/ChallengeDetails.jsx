import React, { useState , useRef } from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Editor from '@monaco-editor/react'
import { assets } from '../assets/assets';

const ChallengeDetails = () => {

  const {token,backendUrl,challenge} = useContext(DataContext)
  const finalToken = token || localStorage.getItem("token")
  const [oneChallenge,setOneChallenge]=useState(null)

  const [leftTab,setLeftTab] = useState("description")
  const [rightTab,setRightTab] = useState("code")
  const [result,setResult] = useState([])
  const [pass,setPass] = useState(0)

  const defaultHtml = `<body>
  <!-- write your html code here -->
</body>`
  const defaultCss = `/* write your css code here */`
  const isFirstLoad = useRef(true)

  const [activeTab,setActiveTab] = useState("HTML") 
  const [html,setHtml] = useState(defaultHtml) 
  const [css,setCss] = useState(defaultCss) 

  const iframeRef = useRef(null);

  const {id} = useParams()

  const singleChallenge = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/challenge/singlechallenge/${id}`)
      
      if (response.data.success) {
        setOneChallenge(response.data.challenge)
        
      }
      else{
        console.log(response.data.message);
        toast.error("Failed to load challenge")
      }
    } catch (error) {
      toast.error("Failed to load challenge")
    }
  }

  const getSubmission = async () => {
    isFirstLoad.current = true

    const savedHtml = localStorage.getItem(`html-${id}`)
    const savedCss = localStorage.getItem(`css-${id}`)

    if (savedHtml || savedCss) {
      setHtml(savedHtml)
      setCss(savedCss)
      return
    }

    try {
      const response = await axios.get(`${backendUrl}/api/submission/${id}`,{headers:{token:finalToken}})

      if (response.data.success) {
        console.log(response.data);
        
        setHtml(response.data.submission.htmlCode)
        setCss(response.data.submission.cssCode)
      }
      else{
        console.log(response.data.message);
        
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const saveSubmission = async (status) => {
    try {
      
      const response = await axios.post(backendUrl+'/api/submission/save',{challengeId:id,htmlCode:html,cssCode:css,status},{headers:{token:finalToken}})

      if (response.data.success) {
        console.log(response);

        localStorage.removeItem(`html-${id}`)
        localStorage.removeItem(`css-${id}`)
        
      }

    } catch (error) {
      console.log(error,"in save submission");
    }
  }

  const resetButton = () => {
    setHtml(defaultHtml)
    setCss(defaultCss)
    localStorage.removeItem(`html-${id}`)
    localStorage.removeItem(`css-${id}`)
  }

  const submitChallenge = async () => {

    const iframeDoc = iframeRef.current?.contentDocument
    const rules = oneChallenge.validationRules    
    console.log(iframeRef.current);
    console.log(iframeRef.current?.contentDocument);

    if (!iframeDoc) {
      toast.error("Preview not loaded yet")
      return
    }

    let passed = 0
    let fail = []

    rules.forEach((rule) => {

      if (rule.type === "exists") {
        const element = iframeDoc.querySelector(rule.selector)

        if (element) {
          passed++
          fail.push({passed:true,message:`${rule.selector} exists`})
        } else{
          fail.push({passed:false,message:`${rule.selector} not found`})
        }
      }
      if (rule.type==="count") {
        const element = iframeDoc.querySelectorAll(rule.selector)
        if (element.length === rule.expected) {
          passed++
          fail.push({passed:true,message:`${rule.selector} count is ${rule.expected}`})
        }
        else{
          fail.push({passed:false,message:`Expected ${rule.expected}, found ${element.length}`})
        }
      }
    });

    setResult(fail)
    setPass(passed)
    setLeftTab("results")

    const status = passed === rules.length ? "completed" : "in-progress";

    if (passed===rules.length) {
      toast.success("challenge success")
    }
    else{
      toast.error(`Passed ${passed}/${rules.length} tests`)
    }

    await saveSubmission(status)
  }

  useEffect(()=>{
    singleChallenge();
    getSubmission();   
  },[id])

  useEffect(()=>{
    if (isFirstLoad.current) {
      isFirstLoad.current=false
      return
    }
    localStorage.setItem(`html-${id}`, html)
    localStorage.setItem(`css-${id}`, css)
   
  },[html,css,id])


  if (!oneChallenge) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='px-2 md:px-20 pt-3 md:py-8'>

      <div className='grid lg:grid-cols-[35%_65%] gap-8'> 

        <div className='bg-slate-900 border border-slate-800 rounded-xl p-3 sm:py-6 sm:px-10 h-fit lg:sticky lg:top-6'> 

          <div className='flex gap-2 md:justify-between p-2 border-b '>
            <button onClick={() => setLeftTab("description")} className={leftTab === "description" ? "bg-cyan-500 text-white px-2 md:px-4 py-2 rounded-lg flex-1": "text-slate-100 bg-slate-600 hover:text-slate-100 px-4 py-2 rounded-lg flex-1"}
            >
              Description
            </button>
            <button
            onClick={() => setLeftTab("results")}
            className={leftTab === "results" ? "bg-cyan-500 text-white px-4 py-2 rounded-lg flex-1" : "text-slate-100 bg-slate-600 hover:text-slate-100 px-4 py-2 rounded-lg flex-1"}
            >
              Result
            </button>
          </div>
         
          {
          leftTab==="description" && (
          <div className='pt-4' >
            <p className='inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 px-3 py-1 rounded-full text-sm'>Challenge #{oneChallenge.challengeNumber}</p>
            <h1 className='text-2xl md:text-3xl font-bold text-slate-100 mt-2'>{oneChallenge?.title}</h1>

            <div className='flex gap-3 mt-4'>
              <span className='bg-slate-800 text-emerald-500 px-3 py-1 rounded-lg text-sm'>{oneChallenge?.difficulty}</span>
              <span className='bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-sm'>{oneChallenge?.category}</span>
            </div>

            <div className='mt-3 md:mt-8'>
             
              <p className='text-slate-400 mt-3 leading-relaxed'>{oneChallenge?.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-md md:text-xl font-semibold text-slate-100 mb-4">Reference Output</h2>
              <img
                src={oneChallenge.outputImage}
                alt={oneChallenge.title}
                className="rounded-xl border border-slate-800 w-60 md:w-100"
              />
            </div>

            <div className='mt-8'>
              <h2 className='text-xl font-semibold text-slate-100'>Requirements</h2>
              <ul className='mt-4 space-y-1 text-slate-400 list-disc pl-5'>
              {
                oneChallenge?.requirements?.map((item,index)=><li key={index}>{item}</li>)
              }
              </ul>
            </div>

          </div>

          )}
          {
          leftTab === "results" && (
          <div className='pt-3'>

            <h2 className='text-xl font-semibold text-slate-100 mb-4'>Challenge Results</h2>
            <p className='text-cyan-500 mb-6'>Passed {pass}/{result.length} Tests</p>

            <div className='flex flex-col gap-3'>
              {
              result.length === 0 ? (<p className='text-slate-400'>No submissions yet.</p>)
              : result.map((item,index)=>(
              <div
              key={index}
              className={`${item.passed ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3 rounded-lg" : "bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg"} p-3 rounded-lg flex items-center gap-3 `}
              >
                <p>{item.message}</p>
                <img src={item.passed ? assets.done : assets.wrong} className="w-8 sm:w-10 shrink-0" alt=""/>

              </div>
              ))}
            </div>

          </div>
          )}
        </div>

        {/* Right Side */}
        <div className='flex flex-col gap-6 px-3 min-w-0'>

          <div className='bg-slate-900 border border-slate-800 rounded-xl overflow-hidden'>


              <div className='flex gap-2 md:justify-between p-2 border-b'>
                <button onClick={() => setRightTab("code")} className={rightTab === "code" ? "bg-cyan-500 text-white px-2 md:px-4 py-2 rounded-lg flex-1": "text-slate-100 bg-slate-600 hover:text-slate-100 px-4 py-2 rounded-lg flex-1"}
                >
                  Code 
                </button>
                <button
                onClick={() => setRightTab("live")}
                className={rightTab === "live" ? "bg-cyan-500 text-white px-4 py-2 rounded-lg flex-1" : "text-slate-100 bg-slate-600 hover:text-slate-100 px-4 py-2 rounded-lg flex-1"}
                >
                  Live Preview
                </button>
              </div>

              {
              rightTab === "code" && (
                <div>
                  <div className='flex flex-col md:flex-row gap-3 border-b border-slate-800 p-3 text-slate-100 justify-between px-3 md:px-5'>

                    <div>
                      <button onClick={() => setActiveTab("HTML")} className={ activeTab === "HTML" ? "bg-cyan-500 text-white px-4 py-2 rounded-lg": "text-slate-400 hover:text-slate-100 px-4 py-2 rounded-lg"}
                      >
                        HTML
                      </button>
                      <button
                      onClick={() => setActiveTab("CSS")}
                      className={activeTab === "CSS" ? "bg-cyan-500 text-white px-4 py-2 rounded-lg" : "text-slate-400 hover:text-slate-100 px-4 py-2 rounded-lg"}
                      >
                        CSS
                      </button>
                    </div>

                   
                
                  </div>
                  {
                  activeTab==="HTML" ? (
                  <Editor 
                  height="380px"
                  language='html'
                  theme='vs-dark'
                  value={html}
                  onChange={(value)=>setHtml(value || "")}
                  options={{
                    minimap:{enabled:false},
                    fontSize:15,
                    wordWrap:"on",
                    automaticLayout:true,
                    scrollBeyondLastLine:false,
                    mouseWheelScrollSensitivity: 1,
                    scrollbar:{
                    vertical:"visible",
                    horizontal:"visible"
                    }}}
                  /> 
                  )
                  : (
                  <Editor
                    height="380px"
                    language='css'
                    theme='vs-dark'
                    value={css}
                    onChange={(value)=>setCss(value || "")}
                  />
                  )}
                </div>
              )}
            </div>
            <div className={rightTab === "live" ? "block" : "hidden"}>
              <div className='bg-slate-900 border border-slate-800 rounded-xl overflow-hidden'>

                <div className='bg-white h-95'>
                  <iframe
                  ref={iframeRef}
                  title='preview'
                  sandbox="allow-scripts allow-same-origin"
                  srcDoc={
                    `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <style>${css} </style>
                      </head>
                      ${html}
                    </html>
                     `
                  }
                  className='h-full w-full'
                  />
                </div>
              </div>
            </div>

            <div className='flex gap-5 justify-end text-xl'>
              <button className='bg-slate-700 hover:bg-cyan-600 px-4 py-1 rounded-lg text-white font-medium' onClick={resetButton}>Reset</button>
              <button onClick={submitChallenge} className='bg-cyan-500 hover:bg-cyan-600 px-4 py-1 rounded-lg font-medium text-white'>Submit</button>
            </div>

        </div>

      </div>

    </div>
  )
}

export default ChallengeDetails
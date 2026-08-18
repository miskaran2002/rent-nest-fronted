'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, GraduationCap, Building2, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden select-none pb-20 pt-8">
      
      {/* মেশ গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-900/15 blur-[130px] animate-pulse duration-10000" />
        <div className="absolute bottom-[20%] right-[10%] w-[60%] h-[60%] rounded-full bg-violet-900/10 blur-[130px] animate-pulse duration-8000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ১. সেকশন: About RentNest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-400">
            <Building2 className="h-3.5 w-3.5" />
            About The Platform
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About RentNest</h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            RentNest is a premium, fully automated rental property marketplace. It bridges the gap between Tenants looking for modern living spaces and Landlords wanting to monetize their properties. Powered by secured Stripe payment gateways and automatic request status transitions, RentNest delivers a seamless real estate experience.
          </p>
        </motion.div>

        {/* ২. সেকশন: About Myself (Split-screen Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-zinc-900/80">
          
          {/* বাম কলাম: আপনার প্রিমিয়াম ছবি */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 relative rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl h-[480px] group animate-none"
          >
           <img
            src="/profile.png" // 'backgroundImage' পরিবর্তন করে সরাসরি 'src' করা হয়েছে
            alt="Md Raihan Uddin"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
          />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-5 left-5 space-y-1">
              <h3 className="text-lg font-bold text-white">Md Raihan Uddin</h3>
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">MERN Stack Developer</p>
            </div>
          </motion.div>

          {/* ডান কলাম: আপনার সম্পূর্ণ একাডেমিক ও প্রফেশনাল প্রোফাইল */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> Meet The Developer
              </span>
              <h2 className="text-3xl font-extrabold text-white">Md Raihan Uddin</h2>
              
              {/* শিক্ষা বা ইউনিভার্সিটি */}
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <GraduationCap className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                <span>Department of Computer Science and Engineering, <strong>University of Barisal</strong></span>
              </div>
            </div>

            {/* সংক্ষিপ্ত বায়ো প্যানেল */}
            <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-indigo-500 pl-4 py-1 italic bg-indigo-500/5 rounded-r-xl">
              &quot;I am a passionate MERN Stack Developer skilled in building highly scalable, secure web applications. I love solving complex algorithms and designing clean database relations. I am also an enthusiast in networking technologies and a dedicated private tutor and mentor.&quot;
            </p>

            {/* স্কিলস ট্যাগস */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Core Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma ORM', 'TypeScript', 'Next.js', 'Cisco Packet Tracer', 'Mentoring'].map((skill, idx) => (
                  <span key={idx} className="text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* সামাজিক ও কন্টাক্ট লিঙ্কসমূহ */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Connect with Me</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                
                {/* ইমেইল */}
                <a href="mailto:raihanuddin.cse8.bu@gmail.com" className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  raihanuddin.cse8.bu@gmail.com
                </a>

                {/* হোয়াটসঅ্যাপ */}
                <a href="https://wa.me/8801608822137" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-zinc-400 hover:text-emerald-400 transition-colors">
                  <MessageSquare className="h-4 w-4 text-emerald-500" />
                  +8801608822137 (WhatsApp)
                </a>

                {/* গিটহাব কাস্টম SVG লোগো */}
                <a href="https://github.com/miskaran2002" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors">
                  <svg className="h-4 w-4 text-zinc-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.02-1.04-.032-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.749 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  github.com/miskaran2002
                </a>

                {/* লিঙ্কডইন কাস্টম SVG লোগো */}
                <a href="https://www.linkedin.com/in/md-raihan-uddin-cse8/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-zinc-400 hover:text-indigo-400 transition-colors">
                  <svg className="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  linkedin.com/in/md-raihan-uddin-cse8
                </a>

              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
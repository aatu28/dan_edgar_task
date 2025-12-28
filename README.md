**Project Scope: The Monsieur Grooming "Revenue-First" Dashboard**

*1. What am I building?*

I’m building a focused insight engine for Dan Edgar that answers the one question every creator has after a long day of filming: "Did that post actually make me money?".

Instead of just showing Dan the same vanity metrics (likes/views) he already sees in his TikTok and Instagram apps; this dashboard connects those views to his actual bank account. The core of the build is a Lag-Adjusted Correlation Engine that aligns his content reach with the 24-48 hour delay in customer buying behavior.

*2. What did I cut and why?*

As a Product Engineer, I prioritized utility over decoration to meet the 2-hour development window.

I cut individual "comment-to-like" ratios. While interesting, they don't help Dan decide what to film next. I focused strictly on Revenue Efficiency also given the time constraints.

 Since there is no direct link between a post and a specific sale, I cut the attempt to "guess" specific attributions. Instead, I focused on macro-patterns (correlations) which provide more honest and actionable advice.

B¥ I opted for a high-fidelity frontend prototype. For this stage of the project, a "browser-side" logic engine is enough to validate the idea with Dan before we spend expensive engineering hours building a full server infrastructure and any dynamic UI elements.

*3. Assumptions I made*
The data analysis shows that revenue is most strongly tied to views from 2 days prior. I’ve built the visual logic around this 2-day lag to give Dan the clearest "Aha!" moment when looking at his charts.

"THE BOX" as the Hero: I assumed "THE BOX" (£49) is the primary driver of Dan's brand health. My UI highlights this product specifically because its higher price point makes it the most important item to track against high-reach videos.

Actionable > Informational: I assumed Dan is busy. He doesn't want to explore data; he wants to be told what to do. I included a "Strategy Recommendation" card to turn raw numbers into a filming schedule.

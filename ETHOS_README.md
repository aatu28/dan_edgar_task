*The Ethos*
Creators like Dan Edgar are masters of content, but they often struggle to see the "business" side of their influence. Native social apps show likes and views, but they don't show the impact on the bank account.

I built this dashboard to solve the "Attribution Gap": the 24-48 hour delay between a viral post and a sales spike. This tool turns raw engagement into a filming strategy for Dan.

*Project Links*
Loom Video Walkthrough: https://www.loom.com/share/3162a88073744a12a4b4d768240a08a9

Live Dashboard Prototype: https://content-sales-optimi-pf1j.bolt.host

 *Product Thinking: The "Revenue-First" Strategy*
 
1. The 48-Hour "Revenue Echo"
Sales don't happen the second a video is watched; there is a "lag" as customers move from discovery to purchase.

 On Dec 14, Dan posted a TikTok duet (post_026) that hit a record 156,000 views.

 Therefore, while sales were standard on the 14th, revenue skyrocketed exactly 48 hours later on Dec 16 to a peak of £923—the highest in the entire period.

Hence I built a Lag-Adjusted Correlation Engine that programmatically shifts view data by 2 days to give Dan the clearest "Aha!" moment when looking at his charts.

*2. Platform Roles: Reach vs. Efficiency*
TikTok is The reach awareness Engine - it drives massive reach (avg. 66.9k views/video) that primes the pump for future sales spikes.

Instagram is the Conversion Engine) Lower reach per post, but a much higher "intent to buy," driving an average next-day revenue of £605.

*3. Product Focus: The Hero Item*
"THE BOX" (£49) is the anchor of the brand, driving the vast majority of the £8,920 total revenue. The UI highlights this product specifically because its price point makes it the most critical item to track against content performance.

*Engineering Trade-offs & Scope*
In a startup environment, speed is a feature. I prioritized utility over decoration to meet the 2-hour development window.

*What I Prioritized*: I focused strictly on Revenue Efficiency and the data logic required to align the 48-hour sales lag.

*What I Cut*

Vanity Metrics: I cut individual "comment-to-like" ratios. While interesting, they don't help Dan decide what to film next.

I opted for a high-fidelity frontend prototype using JSON constants. This validates the product idea before spending expensive engineering hours on a full database and given the time constraints I wanted to validate the data.

*Assumptions*

I assumed Dan is extremely busy. He doesn't want to "explore" data; he wants to be told what to do. I included a "Strategy Recommendation" card to turn numbers into a filming schedule.

*🚀 What's Next?*

If I had more time to build this out with the engineering team, I would implement:

"Viral Velocity" Alerts: A system that texts Dan the moment a video starts trending (like post_026), telling him to check his stock of "THE BOX" before the 48-hour sales peak hits.

Post-Level Attribution: Transitioning from daily correlations to specific post-level scoring based on the engagement weight

Dynamic UI Elements: Create clickable elements if Dan wants to further explore the data.

*Files Included*

daily_sales.json: 16 days of sales data

content_posts.json: 30 social media posts across Instagram and TikTok

Source code for the React-based prototype

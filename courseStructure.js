// course structure
//nodes including tittle, number of topics and node description
let nodes = [
    {title:"<strong>provide care for <span>children</span></strong>", topics:4, description:"What you need to know to provide care for children."},
    {title:"providing care for <span>babies and toddlers</span>", topics:6, description:"Meeting the needs of babies and toddlers."},
    {title:"develop positive and respectful <span>relationships with children</span>", topics:4, description:"How to develop strong, respect based relationships."}
];

//topics in each module
nodes[0].activities = [
    {title:"Example theory content", type:"article", url:"https://www.cleareffective.com.au/clearWP/?page_id=600", description:"This is a very early example of eLearning content with audio support."},
    {title:"Embedded video from YouTube", type:"youtube", url:"https://www.youtube.com/embed/m0FL88_vLwc", description:"Example of how videos can be embedded in the course."},
    {title:"Embedded assessment from aXcelerate", type:"article", url:"https://demo.app.axcelerate.com/learner/assessment/3239971", description:"Example of an assessment from aXcelerate."},
]

nodes[1].activities = [
    {title:"Gender inequality and the four drivers of violence", type:"article", url:"https://demo.app.axcelerate.com/learner/assessment/3123952", description:"Gender inequality, or the unequal distribution of power, resources and opportunities between women and men, creates the conditions for gender-based violence."},
    {title:"Identify the drivers of gender-based violence", type:"article", url:"https://www.cleareffective.com.au/clearWP/?page_id=600", description:"Look at the gender-based drivers of violence in our case study."},
    {title:"Gender-based violence you have witnesses", type:"article", url:"#", description:"What were the drivers in the incident of gender-based violence that you witnessed?"},
    {title:"What can you do?", type:"webinar single-line", url:"#", description:"What actions can you take to challenge the drivers of gender-based violence?"}
]

nodes[2].activities = [
    {title:"What is an Active Bystander?", type:"article", url:"#", description:"What does it mean to be an Active Bystander?"},
    {title:"Benefits of Active Bystander action", type:"article", url:"#", description:"Taking Active Bystander action can have a significant impact."},
    {title:"Bystander Action - Direct (Saying something)", type:"article", url:"#", description:"How to take direct action and speak up."},
    {title:"Bystander Action - Direct (Body language)", type:"article", url:"#", description:"If you don't feel safe or comfortable speaking up, you can still show your disapproval through body language."},
    {title:"Bystander Action - Distract", type:"article", url:"#", description:"Distracting is where you stop a behaviour by interrupting it."},
    {title:"Bystander Action - Delegate", type:"article", url:"#", description:"Getting help from someone who might be more capable of intervening can be a great way to positively impact a situation."},
    {title:"Bystander Action - Delay", type:"article", url:"#", description:"It may not be safe to speak up in the moment, but there are still actions you can take."},
    {title:"Taking action with Mark and Ollie", type:"article", url:"#", description:"See how Active Bystander actions can be used in our case study."}
]

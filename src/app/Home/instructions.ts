export const instructions = `
Instructions

EnablementTips
* Consulting Scoping Process and Tooling Enablement Path<- Anyone new to scoping pre-sales engagments should complete the Consulting Scoping Process and Tooling Enablement Learning Path first
* Three Point Estimates for TSMs (Slide Deck)Contact the scoping enablement team if you want a live presentation for your TSM group

2If completed Enablement Path and looking for refreshers on specific topics
Services Scoping Enablement playlist

3Getting help with this tool or scoping in general
Slack: #help-consulting-project-estimation

Initial Offering Creation
0Make sure you are using the latest template at https://red.ht/ConsultingScopingTemplate
1Click the top right 'USE TEMPLATE' blue button
2"Move created spreadsheet to project folder
The tabs are organized in the order you should complete them, from left to right."
3"""Scoping Participants"" tab 
Add anyone to the the ""Task List Creation Participants"" who assisted in initial completion"
4"""Opportunity Information"" tab
Fill in the customer information and add any relevant links pertaining to the opportunity
Select the ""Normalize Document Title"" button to update the doc title based on opp info"
5Check the Portfolio Hub for existing offerings you can use as a base for your solution
6Import any applicable existing Portfolio Hub offering(s) into this solutionRed Hat Tools -> Import Existing Services Solution
7"“Project Complexity Matrix” tab
Should be completed based on your Client (ask your TSM/account team for assistance)"Each tab has tab specific instructions to reference that go into more detail then the high level instructions here..
8"“Outcomes"" tab 
Review any imported content for relevance
and
Write out each business outcome that the tasks are intended to help achieve. These should by any added capability the customer gains from this engagement and addresses any challenges identified in the ""Opportunity Information” tab"
9"""Tasks"" tab
Review any imported content for relevance
and
Write out any additional task that is in scope for the project and if applicable, their associated prefix, track, and phase"
10"""Weekly Tasks"" tab
Review any imported content for relevance
and
Write out each weekly recurring task that is in scope for the project and if applicable, their associated prefix, track, and phase"
11"""Tasks Legal Words and Phrases to Avoid"" tab
Review any words or phrases Legal prefers you don't use within the task or weekly task tabs. They will be highlighted within both tabs for ease of possible corrections.

If possible re-word your tasks where applicable to avoid this language. The SOW Drafting Guidance document has some helpful alternative suggestions.

It is not always possible, and does not always make sense to avoid all of these words. This is designed as a tool to help preemptively smooth your journey through contracts, deal desk, and legal. There are always exceptions."
12"""Risks"" tab
RReview any imported content for relevance
and
Document any possible risks that would impact the delivery timeline. Estimate the impact of each risk similarly to tasks. Also estimate the ""% Chance"" as the probability that the risk will happen."
13"""Out of Scope"" tab
Review any imported content for relevance
and
Write out any out of scope items that are known not to be included in the scope but someone may assume it is even if not explicitly included and if applicable their associated track and phase"
14"""Prerequisites & Assumptions"" tab
Review any imported content for relevance
and
Write out any known assumptions and if applicable their associated track and phase"
15"""Training Recommendations for Client"" tab
Review any imported content for relevance
and
Capture recommended training for individual Client roles as desired."

Estimation
1"Recruit Level of Effort (LoE) Exercise Participants which should minimally consist of:
* at least 3 participants
* Task List Creation Participants
* At least 1 additional SME per technology involved in the solution that was not involved in the task list creation
* At least 1 ""rubber duck"" technologist who isn't a SME and can therefore help identify unclear tasking
* At least 1 Architect or Principal Consultant"
2Fill out the ""Scoping Participants"" tab for the ""Level of Effort (LoE) Exercise Participants""
3"Run the scoping exercise with relevant peers to capture the best, worst, and most likely case on the ""Tasks"", ""Weekly Tasks"", and ""Risks"" tabs. This will also include:
* refining the task language
* excluding no longer needed tasks
* adding additionally identified risks to the ""Risks"" tab
* adding additionally identified out of scope items to the ""Out of Scope"" tab
* adding additionally identified assumptions to the ""Prerequisites & Assumptions"" tab
* as needed, clarifying section descriptions on the ""Section Descriptions"" tab"Suggested watching:The Art and Science of Estimation

Team Modeling
1Verify the ""Project Complexity Matrix"" has been completed.
2On the ""Team Roles"" tab, fill out the desired roles and their associated metadata
3On the ""Team Modeling"" tab, follow the instructions to model the team
4Review the results on the ""Team Modeling"" tab
5Review the results on the ""Staffing Plan"" tab
6"If model does not match time/budget needs/expectations then valid options are to:
* exclude tasks from scope
* change the verbiage of tasks significantly enough to justify a change in time estimate for that task
* add assumptions which allow for the change of time estimate for a task"
7do NOT change a tasks estimation without changing its wording and thus intent or changing assumptions. the entire point of this exercise is that you accounted for how long each task took without an end state in mind, if you just go back and make those estimates match your desired end state without actually changing what's in scope, you have defeated the entire purpose of the expersize
8Reach out for help to your peers if have questions / need help trying to align expectations with scope / etc

Reviewing Staffing Needs (Output)
1Go to the ""Staffing Needs (Output)"" tab and review the required staffing needs to meet the ""Team Modeling"" selections. Adjust scope as necessary based on review
2Review the ""Possible Staffing Plan"" keeping in mind this is a POSSIBLE staffing plan and the actual output is the ""Staffing Needs (Output)"" and the staffing plan is all business rules and this tool can't tell you % chance of success based on your staffing plan, that is all you and your business rule knowledge of reality

Generating Task List Document
1Red Hat Tools -> Export Client Review Document

Peer Review
0Fill out the ""Scoping Participants"" tab for the ""Peer Review Participants""
1"Review ""Scoping Participants""
* There should be at least 1, ideally 2-3 members listed for the ""Task List Creation Participants"" section
  ** This should include the scoping architect and ideally 1-2 shadows / helpers and possibly the Service Manager
* There should be, at a minimum, 3 technical members listed for the ""Level of Effort (LoE) Exercise Participants"" section
  ** This should include the scoping architect, a SME for each technology being scoped, and a technical member
* All of the PPR review team members need to be listed under ""Peer Review Participants"""
2"Review that there is relevant ""Outcomes""
* there should be at least 1
* no cells should be red
* no cells should contain TODO"
3"Review ""Tasks""
* yellow flag if there is less than 8 tasks per phase/track combination
** phase/track combinations with less than 8 tasks will be highlighted in yellow
* yellow flag if no tasks are imported from a standard offering
** imported tasks will have a black triangle in the cell
* no cells should be red
* no cells should contain TODO"
4"Review ""Weekly Tasks""
* no cells should be red
* no cells should contain TODO"
5"Review ""Tasks Legal Words and Phrases to Avoid""
* Yellow flag if any highlighted cells
* highlighted cells are words or phrases in use in Tasks or Weekly Tasks that Legal would we prefer not to use but it's not a ""no go"" rule. Have a discussion about whether there is any way to rephrase tasks (there isn't always) based on the SOW Drafting Guidance"
6"Review ""Risks""
* yellow flag if no Risks
  ** not necessarily a bad thing, if a tight task list with tight prerequisites, assumptions, and out of scope items
  ** common risks to consider: network changes velocity, onboarding delays, client SME availability
* red flag if a LOT of Risks (e.g. 10% as many Risk items as there are tasks)
  ** indicates that not enough is being mitigated with Out Of Scope and Prerequisites & Assumptions
* no cells should be red
* no cells should contain TODO"
7"Review ""Out of Scope""
* yellow flag if nothing is listed as out of scope (not necessarily a bad thing, but uncommon)
* common out of scope items include being SMEs for none Red Hat but relevant to the engagement products, custom application development
* no cells should be red
* no cells should contain TODO"
8"Review ""Prerequisites & Assumptions""
* red flag if there are no prerequisites or assumptions
* common items include: client SME availability, client finishing the prerequisites checklist, client resoling network requests in a timely manner (preferably before the engagement starts)
* no cells should be red
* no cells should contain TODO"
9"Review ""Section Descriptions""
* There should at least be an offering description
* if there are phases, there should be a description for each phase
* if there are tracks, there should be a description for each track
* no cells should be red
* no cells should contain TODO"
10"Review ""Training Recommendations for Client""
* red flag if no training recommendations
* training recommendations should be relevant to the engagement and the client's current skill set"
11"Review ""Project Complexity Matrix""
* everything should be filled out, aka, should be no red ""Pick One"" boxes"
12"Review ""Team Roles""
* Role names should be descriptive of their purpose on the team, not their seniority
* Role names should NOT include leveling, e.g. ""Openshift Architect"" NOT ""Senior OpenShift Architect"" even if LCAT is set to Sr Arch
* PM Red Hat title and Labor Category should be selected
* all technical roles should have at least ""Skill 1"" filled out
* all roles should have ""Work Location"" filled out
* all roles should have ""Client system/keyboard access"" filled out"
13"Review ""Team Modelling""
* A % chance of success of 50% should be given more scrutiny
* many productive hours in a week set higher than 32 is a red flag
* verify all phases/tracks have at least one role assigned
* verify ""Manual Additional Hours per Phase per Role""
  ** yellow flag if lots of manual additional hours (meaning time without specific tasks)
  ** red flag if any negative manually hours (meaning someone manually removed time out of scope)
* review ""Statistics"" at bottom for expected ratios of PMO, Architect, technical delivery time, and total engagement time"
`;

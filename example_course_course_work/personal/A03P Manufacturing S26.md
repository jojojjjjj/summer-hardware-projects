# A03P Manufacturing

## ESE 5160: IoT Edge Computing Deadline: Feb 16, 202611:59 PM EST

An **individual** submission on Gradescope.

**Late-day requests:** [https://forms.gle/7hZVrXLZ51XiCExm8](https://forms.gle/7hZVrXLZ51XiCExm8) 

Course Webpage: [https://ese5160.seas.upenn.edu/](https://ese5160.seas.upenn.edu/)	

Remember to read the [ESE5160 S26 Assignment README](https://docs.google.com/document/d/1DQJxfhTMBN1aE2uasZiKpqR0JOT77pXvb6tUPF7iKF8/edit?tab=t.0#heading=h.c5nyj2pvdk6p) before starting\!

**All the required questions are highlighted in green.**

**Important notes are highlighted in yellow.**

# Learning Outcomes

* Understand the relationship between mechanical and electrical engineering when designing a product.  
* Learn the basics of a Mechanical CAD tool, SolidWorks.  
* Learn what resources UPenn Engineering has available for building custom designs.  
* Understand how a circuit board is manufactured and assembled in factories \- and how our Altium design will affect the success of its manufacturability\!

# Errata

This section includes commonly asked questions about the assignment. It will be updated continuously throughout the assignment’s lifecycle, so please check it regularly.

(Currently nothing)

# 

# 1\. Casework Description

Take a few minutes to describe your ideal enclosure for your ESE5160 prototype. You might want to review the labs available on campus to get an idea of available resources (see [4\. Lab Access](#4.-lab-access)). Include one or more sketches. Questions to think about include:

1. Are you mounting your casework to anything? (Ex: bike or helmet-mounted device)  
2. Will you need one or multiple cases? (Ex: a wearable device for posture with multiple small PCBAs connected by cables)  
3. Will you have cables connected to peripheral devices?  
4. What materials might work well for your needs? Plastic, wood, metal?  
5. How will you assemble the casework?  
   1. Fasteners like nuts, bolts, washers, screws, standoffs?  
   2. Press-fit pieces made out of acrylic or MDF?  
   3. Adhesives?  
6. What manufacturing techniques will you use? (Ex: 3D printed case, laser cut acrylic plastic, wood cut with a bandsaw, etc.)

**You must sketch by hand\! No CAD or AI renders are accepted.**  
**You must work independently from your teammate\!**

**(1.1)** Submit the following on Gradescope:

* Description of your physical enclosure  
* Describe which manufacturing techniques you expect to use.   
* Include one or more rough sketches of your idea.

# 2\. SolidWorks Tutorial

Though mechanical computer-aided design (MCAD) is not the focus of this course, it helps to have a basic understanding as you design caseworks and develop empathy for the mechanical engineers you’ll work with in industry.

Most engineering lab computers have SolidWorks \- or you can install it on your Windows computer by following [these instructions](https://cets.seas.upenn.edu/answers/solidworks.html). Follow this tutorial and submit the final 3D object for review \- it should take \~20-30 minutes: [Ultimate SolidWorks Tutorial for Absolute Beginners- Step-By-Step](https://www.youtube.com/watch?v=qtgmGkEPXs8)

Note: Altium has the [**MCAD CoDesigner** software](https://www.solidworks.com/partner-product/media/altium-mcad-codesigner-overview) for working with MCAD tools, such as SolidWorks. If you’re interested in a more tightly coupled design experience, you can review and use this tool.  
(2.1) On Gradescope, submit a screenshot of the completed SolidWorks part.

# 3\. PCBA Manufacturing

An important part of learning PCB Design is understanding how PCBs are manufactured. As a hardware engineer, it is vital to understand how PCBs are fabricated and PCBAs assembled. If you do not understand the process, you might make a board that passes muster in Altium, but is non-manufacturable\! 

Review the following two videos. They are very informative and will explain the PCB manufacturing process.  
**Manufacturing:** [Inside a Huge PCB Factory](https://www.youtube.com/watch?v=ljOoGyCso8s)  
**Assembly:** [Inside a PCB Soldering Factory - in China](https://www.youtube.com/watch?v=24ehoo6RX8w&feature=youtu.be)

Answer these questions in **your own words** using what you learned from the videos – a simple one-sentence answer is enough\! 

## Manufacturing

1. Why are manufacturing files reviewed? What are the reviewers checking?   
2. How is the design placed into the copper boards? What is Photoresist?   
3. You can see boards are made in copper pairs. How are they glued together? Why are multiple stacks of copper-fr4-copper stacked together to make a PCB?   
4. The boards are stacked up (depending on their layer count) and then drilled. What are these drillings (vias) for?   
5. What is AOI (Aided/Automatic Optical Inspection)?   
6. What is the Solder Mask (green layer in video) for? ([https://www.eurocircuits.com/sm-solder-mask/](https://www.eurocircuits.com/sm-solder-mask/)) What is the silkscreen?   
7. What is the surface treatment for the copper used for?   
8. 1  
9. What are they testing on the flying lead process (test at the end of the first video)

## Assembly

1. What is a solder paste stencil used for?   
2. What is a pick-and-place machine?   
3. What happens in the reflow oven?   
4. After the reflow oven, on the AOI stage, why does the operator place inspection arrows? What is tombstoning?   
5. Why did they use X-RAY to inspect a BGA component?   
6. How were through-hole components assembled in the video?   
7. How does the wave soldering machine work?   
8. What is the testing jig, or bed of nails, for?

(3.1) On Gradescope, submit your answers to these questions.

# 4\. Lab Access {#4.-lab-access}

Engineering projects require you to think outside of your specific field. When designing PCBAs, for example, you’ll need to consider the user interface, user experience, casework, and device functionality. In ESE5160, you’ll be creating a final demo for your product \- we want you to have some essential mechanical CAD (MCAD) skills and resources to help make something memorable.

Penn has excellent resources for you to build things. Generally, you just need to take a fairly quick safety exam. Review the resources below

* [Garage Lab](https://meamlabs.seas.upenn.edu/garage-lab-and-tool-library/) for:  
  * Hand tools: Screwdrivers, Hammers, Wire Cutters and Strippers, Drills, Impact Drivers, Rotary tools (Dremels), Orbital Sanders  
  * Power tools: Belt Sanders, Drill Press, Bandsaw, Miter Saw, Buffing Wheel, Sandblasting Cabinet  
* [RPL – MEAM Labs](https://meamlabs.seas.upenn.edu/rapid-prototyping-lab/) for laser cutting and 3D printing  
  * You can get access to use the laser cutters & 3D printers yourself, you need to pass the [training](https://meamlabs.seas.upenn.edu/rapid-prototyping-lab/training/).  
  * Or, you can just submit 3D files for printing using these [instructions](https://meamlabs.seas.upenn.edu/rapid-prototyping-lab/makerfleet/).  
* Tangen Hall [Fabrication Studios](https://venturelab.upenn.edu/fabrication-studios)  
  * Laser cutting, 3D printing, CNC operations, mechatronics lab

**Apply for Lab Access:**

* Identify at least one lab that you plan to use.  
* Complete the necessary safety exam or training application for that lab immediately. Enrollment may take some time, so early application is essential.

**(4.1)** No submission required; just gain access to one of the labs listed above.

# Rubric

See the Gradescope assignment for the rubric details. For all questions, 0 points may be awarded if the submission is non-existent, very poorly done, or doesn’t compile (for firmware assignments).

This is a pass/fail assignment.  

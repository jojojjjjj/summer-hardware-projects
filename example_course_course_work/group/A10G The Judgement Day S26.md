# A10G The Judgement Day (S26)

## ESE 5160: IoT Edge Computing Deadline: Apr 29, 2026 8:00 AM EDT

| A group submission on Gradescope & GitHub Classroom. On Gradescope, you must submit a link to your GitHub repository. This is so we have something to assign your grade to. The physical demonstration is the only thing graded \- you’ll have time to update your repositories for the [A11G Final Submission S26](https://docs.google.com/document/d/1XWh6uLMdHHajqJAJOqMVcPQL23xtTprTEw6KbZwprEA/edit?tab=t.0#heading=h.blhb7pduv93k) assignment.GitHub Classroom Assignment: [https://classroom.github.com/a/1AhllCUs](https://classroom.github.com/a/1AhllCUs)  | ![][image1] |
| :---- | :---- |

| No late-days allowed for this assignment\! |
| :---: |
| If you are not ready to demo at 8am on Demo Day, you may receive a 0\. |

Course Webpage: [https://ese5160.seas.upenn.edu/](https://ese5160.seas.upenn.edu/)	

Remember to read the [ESE5160 S26 Assignment README](https://docs.google.com/document/d/1DQJxfhTMBN1aE2uasZiKpqR0JOT77pXvb6tUPF7iKF8/edit?tab=t.0#heading=h.c5nyj2pvdk6p) before starting\!

**All the required questions are highlighted in green.**

**Important notes are highlighted in yellow.**

# Learning Outcomes

* Execute a live demonstration of your IoT device, on a timeline, in front of peers and folks from industry\!

# Errata

This section includes commonly asked questions about the assignment. It will be updated continuously throughout the assignment’s lifecycle, so please check it regularly.

(Currently nothing)

# 1\. Sensors

* Show that your sensors function correctly \- the firmware can correctly operate the hardware.

* It’s recommended to have CLI controls and printouts to help confirm this\!

* Sensor data is displayed on the Node-RED dashboard and updates in real time.

# 2\. Actuators

* Show that your actuators function correctly \- the firmware can correctly operate the hardware.

* It’s recommended to have CLI controls and printouts to help confirm this\! Actuator control implemented on the Node-RED dashboard can be similarly useful.

# 3\. Physical Construction

* Build the physical elements required to demonstrate your concept.

* This could include:

  * A casework for your PCBA

  * Mounting elements for your actuators and sensors

* See Integration below for more information.

# 4\. Integration

* Your final project will be evaluated for its total integration with firmware, software (Node-RED and, perhaps, other software), sensors, actuators, physical elements (casework, buttons, levers, etc.)

* You must use your custom PCBA with proposed peripheral devices for the final demo day.

  * If you need to use your dev board or change your peripherals, you need to clear it with the teaching team.

* Does your demo meaningfully show the application of your device?

  * Example \#1: if you’re making an IoT plant watering device, bring in potted plants to show what happens when the soil is dry.

  * Example \#2: if you’re making a smart lock for an existing door deadbolt, show it working on a real or mock deadbolt.

# 5\. Power Architecture

Demonstrate how your power architecture works. All projects use a battery \- you should demonstrate your entire system running off of battery power alone, untethered from a USB connection.

# 6\. Over The Air Firmware Updates

Demonstrate that you can rewrite the firmware application on your microcontroller based on a file hosted online. The change should be clear, either the physical manifestation of an LED or a command line interface change. The OTAFU must be initiated from the Node-RED webpage.

The updated firmware should still maintain the main IoT application functionality \- including the ability to update firmware over the air again. Loading a bare bones “LED blink” firmware image won’t cut it.

# Extra Credit

Extra credit may be awarded by the teaching team based on final submission and final demo performance. We love being impressed\!

# Rubric

See the Gradescope assignment for the rubric details. For all questions, 0 points may be awarded if the submission is non-existent, very poorly done, or doesn’t compile (for firmware assignments).

[image1]: <data:image/png;base64,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>
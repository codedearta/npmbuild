atscdf-ui
=========

ATS Campaign and Deal Fulfilment User Interface


Motivation:
- grunt is hard to maintain, many dependencies
- used broccoli for private projects -> messy, many dependencies as well
- gulp uses streaming which is great but other tha that it is still an uneccessary additional dependency

=> script block in npm can do everything I need. Npm comes together with node. Almost every JS-developer has it on his machine.
 + less code
 + supports streaming
 + no additional syntax
 + no additional tool (comes with node.js) 
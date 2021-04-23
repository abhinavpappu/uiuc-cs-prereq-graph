# uiuc-cs-prereq-graph

Visualization of prereqs for UIUC CS courses with a dependency graph (https://uiuc-cs-prereq-graph.netlify.app/). Especially useful for seeing which courses a given course is a prereq for.

Note: You can move the graph around as well as zoom in and out. Individual nodes can also be moved around in case anything is overlapping.

### How to Run
1. `npm install`
2. (Optional) `npm run getdata`
3. `npm start`

Update the URL in `get-data.ts` (and run `npm run getdata`) to get data for the most recent semester
(can also be trivially modified to work with other subject courses as well, might get to that eventually)

Will break if the response format for https://courses.illinois.edu/cisapp/explorer/catalog/2021/fall/CS.xml?mode=cascade changes.


Award tracker is a program that adds structure to award tracking.

Valuable information for awards

. section
. nameRecipient
. awardType
. presDate
. currentStatus
. currentLocation
. asOfDate
. notes



## Installation

1. Clone the git repository `git clone git@gitlab.com:stevewillson/award_tracker.git`
2. Change directory to the cloned repository `cd award_tracker`
3. Install dependencies `npm install`
4. Start a development server `npm start`
5. Browse to `localhost:3000` to use award_tracker

## Package to a single `index.html` file

1. Clone the git repository `git clone git@gitlab.com:stevewillson/award_tracker.git`
2. Change directory to the cloned repository `cd award_tracker`
3. Install dependencies `npm install`
4. Build the application `npm run build`
5. Generate the single `index.html` file: `npx gulp`
6. The generated file is located at: `./build/index.html`
7. Open this file locally on a computer with a web browser to use award_tracker without connecting to the internet

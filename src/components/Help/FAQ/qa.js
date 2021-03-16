// Questions and answers config file
const qa = {
  topics: [
    {
      title: 'Therapists',
      questions: [
        {
          title: 'How do I add a new RBT/BT?',
          answer:
            'On the "My Roster" page, there is a "MANAGE" button at the top right corner of the window. Click this, then click "ADD NEW MEMBER".',
        },
        {
          title: 'How do I edit the weekly working hours of an RBT/BT?',
          answer:
            'On the "My Roster" page, there is a "MANAGE" button at the top right corner of the window. Click this, then click "EDIT" to change their name and hours per week. The same functionality exists on the "All staff" page.',
        },
        {
          title: 'How do I delete an RBT?',
          answer:
            'On the "My Roster" page, there is a "MANAGE" button at the top right corner of the window. Click this, then click "DELETE" on the appropriate RBT. The same functionality exists on the "All staff" page.',
        },
        {
          title: 'What does it mean to "follow" an RBT?',
          answer:
            'Following an RBT means you want to keep track of their weekly supervision. You can unfollow any RBTs/BTs in your clinic that you do not need to be keeping tabs on. If you know you will be supervising someone on a regular basis, follow them so that they will appear in your roster.',
        },
        {
          title: 'What is my roster?',
          answer:
            'Your roster is the page where you can see all the RBTs you currently follow.',
        },
        {
          title: 'How do I remove an RBT/BT from my roster?',
          answer:
            'Click the orange "MANAGE" button on your roster page, then click "UNFOLLOW" on the RBT/BT you no longer want to be following. The same functionality exists on the "All staff" page.',
        },
        {
          title: 'What is the number at the top of each RBT/BT card?',
          answer:
            "This the RBT/BT's ID number. Give this number to your RBT so that they can access their supervision history through the front page of SOUP.",
        },
        {
          title: 'What is an RBT/BTs history?',
          answer:
            'The history page documents all submitted SOUPs. Go here to see a graph of their progress, or to review previously completed supervisions.',
        },
        {
          title: 'Why are the RBT cards red/yellow/green?',
          answer:
            'A red RBT card signifies that the RBT/BT has recieved less than 50% of their 5% weekly supervision minimum. Yellow means above 50%, and green means 100% is complete. The 5% is calculated from the weekly working hours you have set for the RBT',
        },
        {
          title: 'What do the percentages on the RBT/BT cards mean?',
          answer:
            'The top percentage indicates what percentage of required supervision time has been met for the current week. The second bubble indicates how many hours of supervision this week were conducted by a candidate/intern/non-BCBA. The bottom bubble indicates the most recently conducted SOUP total score.',
        },
        {
          title: 'How can I show my BT/RBT their supervision history?',
          answer:
            'Direct them to visit soup.therapigeon.com - there they can enter in their RBT ID to review their SOUP history.',
        },
        {
          title:
            'Where do I find the RBTs in my clinic that I am not following?',
          answer:
            'On the "All staff" page, or by selecting "MANAGE" on your roster page.',
        },
        {
          title:
            'One of my RBTs left the company, do I need to do anything in SOUP?',
          answer:
            'No. In the future we will provide an "archive" feature. It is best practice to hold onto these records for future reference. Simply unfollow RBTs/BTs you do not plan to supervise in the near future. All completed SOUPs are available to download in PDF format for your personal record keeping.',
        },
      ],
    },
    {
      title: 'Supervisors',
      questions: [
        {
          title: 'How do I invite someone to my clinic?',
          answer:
            'Give them your clinic ID. They can use this on the join clinic page.',
        },
        {
          title: 'What is a candidate/intern?',
          answer:
            'A candidate/intern is someone on their way to becoming a BCBA, who can conduct supervisions, but is not fully certified.',
        },
        {
          title: 'How do I remove a supervisor from my clinic?',
          answer: 'This is not currently implemented.',
        },
        // {
        //   title: 'How do I change my name/email etc?',
        //   answer:
        //     'Go to the settings tab. The button is located on the orange navigation bar on the left side of the window.',
        // },
      ],
    },
    {
      title: 'Clinics',
      questions: [
        {
          title: 'What is a clinic?',
          answer:
            'Clinics hold a list of RBTs/BTs, interns/candidates, and supervisors/BCBAs that all work at the same company.',
        },
        {
          title: 'How do I join a new clinic?',
          answer:
            'On the orange navigation bar located on the left side of the window, there is a dark gray tab with a white arrow on it. Hover your mouse over this tab. Click the + to join another clinic. To join a new clinic you will need to know the ID of that clinic.',
        },
        {
          title: 'Can I be in more than one clinic at once?',
          answer:
            'Yes. Use the clinic switcher tab, located in the middle of the orange navigation bar at the left side of the window. Hover your mouse over the white arrow and select the ID of the clinic you want to switch to.',
        },
        {
          title: 'Can RBTs be shared across clinics?',
          answer: 'No.',
        },
        {
          title: 'How do I leave a clinic?',
          answer: 'This is not currently implemented',
        },
        {
          title: 'How do I switch between my existing clinics?',
          answer:
            'Use the clinic switcher tab, located in the middle of the orange navigation bar at the left side of the window. Hover your mouse over the white arrow and select the ID of the clinic you want to switch to.',
        },
        {
          title: 'What is a clinic ID?',
          answer:
            'Give your clinic ID to any new supervisors joining SOUP so that they can conduct supervisions on the BTs/RBTs in your clinic. The ID is used to join the clinic.',
        },
        {
          title: 'How do I create a clinic?',
          answer:
            'Hover over the clinic switcher tab, a white arrow located in the middle of the orange navigation bar at the left side of the window. Click the + button, then select "create a clinic".',
        },
        // {
        //   title: 'How many clinics can I make?',
        //   answer:
        //     'Currently, only the owner of an enterprise account can create clinics.',
        // },
      ],
    },
    {
      title: 'SOUPs',
      questions: [
        {
          title: 'What is a SOUP?',
          answer:
            'SOUP is what we call supervisions here at TheraPigeon. We were inspired by BCBAs using the same term casually in conversation. This is also sometimes referred to as "direction of therapists".',
        },
        {
          title: 'What does NA mean on the SOUP form?',
          answer:
            'Any question you mark as NA will not be counted when determining an RBT/BTs score. "Not Applicable". ',
        },
        {
          title: "Why can't I type in the 'notes' section?",
          answer:
            'For every question on the SOUP form, there is a button to "Add Note". RBTs/BTs will see this feedback when they review their supervision scores. At the bottom of every SOUP form, our software collects these notes and puts them in a textbox. This is strictly for those wanting to copy and paste their feedback in order to more quickly write their session note. Copy the notes and paste them elsewhere to use them how you see fit!',
        },
        {
          title: 'Can I save a SOUP in progress?',
          answer:
            'Hit the "Save & Exit" button at the bottom of the SOUP form instead of "Submit". In progress SOUPs will appear at the top of your roster.',
        },
        {
          title: 'How do I continue an in-progress SOUP?',
          answer:
            'If you have any in-progress SOUPS, they will appear at the top of your roster. Click "CONTINUE" to continue conducting the supervision. If you no longer plan to finish the session, or if it was created by accident, click "DISCARD".',
        },
      ],
    },
    {
      title: 'History',
      questions: [
        {
          title: 'How do I delete a SOUP?',
          answer:
            'If you are the supervisor who conducted the supervision, navigate to the "History" page by clicking the View History button on the relevant RBT/BTs card. An orange "DELETE" button will appear on any SOUP you are permitted to delete.',
        },
        {
          title: 'How do I edit a SOUP?',
          answer:
            'If you are the supervisor who conducted the supervision, navigate to the "History" page by clicking the View History button on the relevant RBT/BTs card. Click "VIEW" on the SOUP you want to edit. An "Edit" button will appear at the top right corner of the SOUP display.',
        },
        {
          title: "Why can't I edit/delete a SOUP?",
          answer:
            'Only the supervisor who conducted a given SOUP has the ability to edit or delete it.',
        },
        {
          title: 'How do I show multiple datasets on the history graph?',
          answer:
            'Located at the top of the graph is a legend, mapping a color to a particular dataset. Click on any of the colored squares to toggle the visibility of that dataset on the graph.',
        },
        {
          title: 'How do I download/save SOUPs in PDF format?',
          answer:
            'Go to the history page of the relevant RBT by clicking on the "View History" button on their card. Click the "VIEW" button of the SOUP you want to download. An orange "DOWNLOAD PDF" button will appear.',
        },
      ],
    },
    {
      title: 'MISC',
      questions: [
        {
          title: 'Where can I read your Terms of Service Agreement?',
          answer:
            'The TOS can be found at very the bottom left of your window, on the orange navigation bar. Click "Terms of Service" to navigate to the document.',
        },
        {
          title: 'How do I report a bug?',
          answer:
            'The "Report a bug" navigation button is the second to last button on the orange navigation bar, found on the left side of the screen. Fill out the form and hit submit.',
        },
        {
          title: 'How do I log out?',
          answer:
            'Click the last button on the orange navigation bar, labeled "Logout". This is located at the bottom left corner of the window.',
        },
        {
          title: 'How do I request a feature?',
          answer: 'Send us an email at contact@therapigeon.com',
        },
      ],
    },
  ],
};

export default qa;

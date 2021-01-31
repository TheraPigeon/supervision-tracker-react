import { cloneDeep } from 'lodash';

const mainSelection = {
  0: ['Yes', 'Y', 1],
  1: ['Almost', 'A', 0.5],
  2: ['No', 'N', 0],
  3: ['N/A', 'NA', null],
};
const additionalMetricsSelection = {
  0: ['Excellent', 'E', 2],
  1: ['Satisfactory', 'S', 1],
  2: ['Needs Improvement', 'NI', 0],
  3: ['N/A', 'NA', null],
};
const setupSessionType = {
  0: ['In-Person', 'in_person'],
  1: ['Telehealth', 'telehealth'],
};
const setupSessionArrangement = {
  0: ['Solo', 'solo'],
  1: ['Group', 'group'],
};

export const initialState = {
  controls: {
    setup: {
      0: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          name: '0',
          // label: 'Date',
          question: 'Date of the session',
        },
        value: new Date(Date.now()),
        validation: {
          required: true,
        },
        valid: true,
      },
      1: {
        elementType: 'input',
        elementConfig: {
          type: 'time',
          name: 'start_time',
          label: 'Start time',
        },
        value: new Date(Date.now()),
        validation: {
          required: true,
        },
        valid: true,
      },
      2: {
        elementType: 'input',
        elementConfig: {
          type: 'time',
          name: 'end_time',
          label: 'End time',
        },
        value: new Date(Date.now() + 60000 * 60),
        validation: {
          required: true,
        },
        valid: true,
      },
      3: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'telehealth',
          options: cloneDeep(setupSessionType),
          question: 'Type of session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      4: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'group',
          options: cloneDeep(setupSessionArrangement),
          question: 'Type of Session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: false,
      },
    },
    starting: {
      s0: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 's0',
          options: cloneDeep(mainSelection),
          question: 'Arrived on time / followed late arrival protocol',
        },
        value: 'NA',
        noteValue: '',

        validation: {
          required: true,
        },
        valid: true,
      },
      s1: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 's1',
          options: cloneDeep(mainSelection),
          question: 'Set up materials/curriculum/data sheets for session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      s2: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 's2',
          options: cloneDeep(mainSelection),
          question:
            'Informed care givers of programming session items\n-shared if new programs will be run or anticipate problem behavior during the session and plan of action\n-inquired if there is anything special going on at home or session needed to end early',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      s3: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 's3',
          options: cloneDeep(mainSelection),
          question: 'Reviewed data from previous day',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    main: {
      m0: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm0',
          options: cloneDeep(mainSelection),
          question: 'Set up materials/curriculum/data sheets for session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m1: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm1',
          options: cloneDeep(mainSelection),
          question: 'Used antecedent procedures as outlined in the BIP',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m2: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm2',
          options: cloneDeep(mainSelection),
          question: 'Accurately implemented BIP intervention procedures',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m3: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm3',
          options: cloneDeep(mainSelection),
          question: 'Used transition warnings if necessary',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m4: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm4',
          options: cloneDeep(mainSelection),
          question: 'Used environmental arrangement/set-up',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m5: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm5',
          options: cloneDeep(mainSelection),
          question:
            'Identified in the moment MO and used it to reward/shape behavior',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m6: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm6',
          options: cloneDeep(mainSelection),
          question: 'Identified potential setting events',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m7: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm7',
          options: cloneDeep(mainSelection),
          question: 'Took data throughout session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m8: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm8',
          options: cloneDeep(mainSelection),
          question: 'Interspersed targets within programs and across programs',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m9: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm9',
          options: cloneDeep(mainSelection),
          question: 'Conducted DT in various locations when applicable',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m10: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm10',
          options: cloneDeep(mainSelection),
          question:
            "Varied pacing as necessary to shape behaviour and learner's attention/interest",
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m11: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm11',
          options: cloneDeep(mainSelection),
          question: 'Delivered clear Sds',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m13: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm13',
          options: cloneDeep(mainSelection),
          question:
            'Taught and shaped all skill acquisition programs and accurately implemented teaching procedures as written within programs',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m14: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm14',
          options: cloneDeep(mainSelection),
          question:
            'Identified the difference between shaping skills within a session and the necessity of implementing a skill acquisition program',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m15: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm15',
          options: cloneDeep(mainSelection),
          question:
            'Demonstrated awareness of clinical skill limitation and requested assistance when necessary',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m16: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm16',
          options: cloneDeep(mainSelection),
          question:
            "Used familiar teaching procedures to ensure the learner's success in other activities/environments",
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m17: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm17',
          options: cloneDeep(mainSelection),
          question:
            'Provided adequate number of verbal models and shaped novel language acquisition',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m18: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm18',
          options: cloneDeep(mainSelection),
          question: 'Contrived manding opportunities',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m19: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm19',
          options: cloneDeep(mainSelection),
          question: 'Taught social competence skills',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m20: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm20',
          options: cloneDeep(mainSelection),
          question:
            'Delivered more rewards/praise statements vs. prompts throughout the session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m21: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm21',
          options: cloneDeep(mainSelection),
          question: 'Delivered effective prompts',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m22: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm22',
          options: cloneDeep(mainSelection),
          question: 'Faded manual prompts when necessary',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m23: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm23',
          options: cloneDeep(mainSelection),
          question: 'Implemented error correction procedures effectively',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m24: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm24',
          options: cloneDeep(mainSelection),
          question:
            "Learner's engagement was at 80% or greater during various activities",
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m25: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm25',
          options: cloneDeep(mainSelection),
          question:
            'Provided real life rationales throughout session as appropriate',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m26: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm26',
          options: cloneDeep(mainSelection),
          question: 'Followed the center schedule',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m27: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm27',
          options: cloneDeep(mainSelection),
          question: 'Voice tone varied regarding activity',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      m28: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'm28',
          options: cloneDeep(mainSelection),
          question: 'Modeled language through play/throughout activities',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    ending: {
      e0: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'e0',
          options: cloneDeep(mainSelection),
          question: 'Graphed data / wrote session note within session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      e1: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'e1',
          options: cloneDeep(mainSelection),
          question:
            'Communicated necessary info to next therapist working with learner',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      e2: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'e2',
          options: cloneDeep(mainSelection),
          question: 'Cleaned up materials / curriculum',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      e3: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'e3',
          options: cloneDeep(mainSelection),
          question: 'Provided summary to parents / caregivers',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      e4: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'e4',
          options: cloneDeep(mainSelection),
          question: 'Checked in with BCBA at end of session',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    additional: {
      a0: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'a0',
          options: cloneDeep(additionalMetricsSelection),
          question:
            'Professionalism (i.e., used client first language, communicated with parents/staff, followed schedule, responded to emails within 24/48 hours)',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      a1: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'a1',
          options: cloneDeep(additionalMetricsSelection),
          question:
            'Session notes (i.e., used appropriate vocabulary, summarized data, noted anything novel in session) AND Data Sheet loaded to the drive',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      // a2: {
      //   elementType: 'input',
      //   elementConfig: {
      //     type: 'radio',
      //     name: 'a2',
      //     options: cloneDeep(additionalMetricsSelection),
      //     question:
      //       'Rendering / NPA Appointments (i.e., communicated appointment modifications, added notes, rendered withindate)',
      //   },
      //   value: 'NA',
      //   noteValue: '',
      //   validation: {
      //     required: true,
      //   },
      //   valid: true,
      // },
      a3: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'a3',
          options: cloneDeep(additionalMetricsSelection),
          question:
            'Rapport Building / Enthusiasm / FUN in session (i.e., made learning fun, age appropriate jokes, spoke in positive/up beat voice tone)',
        },
        value: 'NA',
        noteValue: '',
        validation: {
          required: true,
        },
        valid: true,
      },
      a4: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          name: 'a4',
          question: 'Improvements from previous session:',
        },
        value: '',
        noteValue: '',
        validation: {},
        valid: true,
      },
      a5: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          name: 'a5',
          question: 'Suggestions for next session:',
        },
        value: '',
        noteValue: '',
        validation: {},
        valid: true,
      },
      a6: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          name: 'a6',
          question: 'Overall feedback:',
        },
        value: '',
        noteValue: '',
        validation: {},
        valid: true,
      },
      a7: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          name: 'a7',
          question: 'Team Member Comments:',
        },
        value: '',
        noteValue: '',
        validation: {},
        valid: true,
      },
    },
    note: {
      n0: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          name: 'n0',
          question: 'Session Note Generated from individual notes:',
        },
        value: '',
        noteValue: '',
        validation: {},
        valid: true,
      },
    },
  },
  scores: {
    start: null,
    main: null,
    end: null,
    additional: null,
    total: null,
  },
  formIsValid: false,
  addingNote: false,
  questionId: null,
  questionCategory: null,
  noteValue: '',
};

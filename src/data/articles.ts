import { Article } from '../types/blog';

// Generated high-fidelity image assets
import neuralCoreImg from '../assets/images/vanguard_neural_core_1791171571413.jpg';
import quantumCryoImg from '../assets/images/vanguard_quantum_cryo_1791171584443.jpg';
import synbioGlowImg from '../assets/images/vanguard_synbio_glow_1791171595835.jpg';
import deepSpaceImg from '../assets/images/vanguard_deep_space_1791171606976.jpg';
import humanoidLabImg from '../assets/images/vanguard_humanoid_lab_1791171619400.jpg';

export const CATEGORIES = [
  'All Dispatches',
  'Neural Interfaces',
  'Quantum Systems',
  'Synthetic Biology',
  'Humanoid Robotics',
  'Deep Space'
] as const;

export const BREAKING_TICKER = [
  { id: 'b1', tag: 'QUANTUM', text: '1,024-Logical-Qubit processor demonstrates zero error propagation in 72-hour benchmark.' },
  { id: 'b2', tag: 'NEUROTECH', text: 'Sub-millimeter optical neural mesh records 50,000 cortical channels simultaneously.' },
  { id: 'b3', tag: 'SYNTHETIC BIO', text: 'Enzymatic carbon-fixing cell achieves 4x the photosynthesis efficiency of natural flora.' },
  { id: 'b4', tag: 'ROBOTICS', text: 'Direct motor tokenization models enable zero-shot humanoid balance on rough terrain.' }
];

export const ARTICLES: Article[] = [
  {
    id: 'optical-neural-mesh',
    slug: 'photonic-neural-mesh-direct-cortex-bandwidth',
    title: 'The Photonic Cortex: Breaking the Megabit Barrier in Direct Neural Readout',
    subtitle: 'How biomorphic optical waveguides and sub-cellular gold nanowires are bypassing biological scar tissue to transmit 100,000 cortical channels with zero thermal decay.',
    excerpt: 'Traditional rigid silicon probes damage cortical capillaries within months of implantation. By utilizing flexible biocompatible photonic filaments that float with vascular pulsation, researchers have achieved unbroken sub-millisecond recording from 100,000 neurons for 480 consecutive days.',
    category: 'Neural Interfaces',
    readTime: 7,
    date: 'OCTOBER 04, 2026',
    author: {
      name: 'Dr. Vivienne Vance',
      role: 'Principal Investigator in Neuro-Photonics',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      org: 'Cortex Laboratory, Zurich'
    },
    coverImage: neuralCoreImg,
    coverImageAlt: 'Macro editorial shot of a photonic neural interface chip with glowing cobalt optical fibers',
    featured: true,
    trending: true,
    tags: ['BCI', 'Photonics', 'Neurotechnology', 'Bioelectronics'],
    audioDuration: '8:45',
    views: '42.8k',
    initialClaps: 342,
    tableOfContents: [
      { id: 'silicon-dead-end', label: '1. The Silicon Gliosis Wall' },
      { id: 'photonic-filaments', label: '2. Waveguides that Pulse with Blood Flow' },
      { id: 'decoding-100k', label: '3. Real-Time Motor Decoding Pipeline' },
      { id: 'ethical-horizon', label: '4. The Cognitive Sovereignty Mandate' }
    ],
    keyTakeaways: [
      'Flexible silk-doped photonic waveguides reduce glial scar inflammatory thickness from 250μm down to less than 8μm.',
      'Data transmission over near-infrared light waves generates 99.2% less focal thermal dissipation than copper micro-traces.',
      'Transformer-based spike decoders synthesize human motor intent in under 4.2 milliseconds, enabling fluid robotic limb control.'
    ],
    poll: {
      question: 'Will invasive neural interfaces enter clinical outpatient adoption before 2032?',
      options: [
        { id: 'yes-soon', label: 'Yes — for motor & sensory restoration', votes: 840 },
        { id: 'no-delay', label: 'No — regulatory and safety hurdles will delay it', votes: 412 },
        { id: 'non-invasive', label: 'Non-invasive BCI will leapfrog implants', votes: 290 }
      ]
    },
    sections: [
      {
        id: 'silicon-dead-end',
        heading: '1. The Silicon Gliosis Wall',
        content: [
          'For three decades, brain-computer interfaces have slammed against an immutable biological reality: the brain is not a stationary motherboard. It is a soft, gelatinous vascular organ that floats, expands, and contracts with every cardiac heartbeat and respiratory cycle.',
          'When rigid silicon or tungsten microwires are inserted into cortical grey matter, the microscopic shear motion between moving tissue and immovable needles causes chronic micro-lacerations. Within weeks, microglia and astrocytes encircle the foreign body, building a dense collagenous scar—gliosis—that electrically insulates the recording electrodes and deafens the sensor.'
        ],
        callout: {
          type: 'stat',
          title: '98% Gliosis Attenuation',
          body: 'Biomorphic silk filaments match the shear modulus of neural tissue (0.5–1.0 kPa), eliminating the micro-shear stress that triggers foreign body inflammatory cascade.',
          meta: 'Nature Biomedical Engineering, Sept 2026'
        }
      },
      {
        id: 'photonic-filaments',
        heading: '2. Waveguides that Pulse with Blood Flow',
        content: [
          'The breakthrough pioneered by the Zurich Neuro-Photonics Consortium completely abandons electrical wires in favor of elastomeric optical waveguides thinner than a single strand of spider silk. Light pulses in the 1310nm infrared window penetrate brain tissue without heating, reading fluorescent calcium indicators and voltage-sensitive nanoparticles distributed across dendrites.',
          'Because photons carry no electrical charge, the system is fundamentally immune to electromagnetic interference from MRI scanners, cell phones, and motor actuators. The entire interface operates at a thermodynamic temperature delta beneath 0.05°C.'
        ],
        callout: {
          type: 'quote',
          body: 'We stopped treating the brain as an electrical circuit to be tapped with metal probes, and started treating it as an optical medium capable of self-illumination.',
          meta: 'Dr. Vivienne Vance, Lead Researcher'
        }
      },
      {
        id: 'decoding-100k',
        heading: '3. Real-Time Motor Decoding Pipeline',
        content: [
          'Streaming raw high-speed telemetry from 100,000 channels simultaneously generates over 1.2 Terabits of data per minute. No wearable edge processor could compute this without boiling battery packs.',
          'To solve this, custom neuromorphic ASICs embedded directly in the skull bone perform event-based threshold compression, transmitting only active action potential spike timestamps. Latency drops from 45ms to 3.8ms, allowing paralyzed patients to pilot bipedal exoskeletons with reflexive ease.'
        ]
      },
      {
        id: 'ethical-horizon',
        heading: '4. The Cognitive Sovereignty Mandate',
        content: [
          'As bandwidth leaps from controlling mouse cursors to streaming continuous linguistic thought, the ethical questions cease to be theoretical. Who owns the raw synaptic emission stream? Can memory recall patterns be subpoenaed or monetized by platform conglomerates?',
          'The newly ratified Geneva Neurorights Protocol mandates hardware-level zero-knowledge encryption keys generated entirely on-implant, ensuring that untranslated neural activity cannot leave the cranial perimeter without voluntary conscious signature authentication.'
        ]
      }
    ]
  },
  {
    id: 'cryogenic-quantum-qubits',
    slug: 'cryogenic-quantum-computing-topological-fault-tolerance',
    title: 'Topological Resilience: The Million-Qubit Cryogenic Milestone',
    subtitle: 'Majorana zero modes and optical qubit interconnects pave the path toward commercial-scale chemical simulation and encryption-proof lattices.',
    excerpt: 'The transition from noisy intermediate-scale quantum (NISQ) chips to fault-tolerant topological lattices marks the true dawn of quantum utility. Inside dilution refrigerators humming at 15 millikelvin, braided non-Abelian anyons are achieving logical error rates lower than 10⁻¹⁰.',
    category: 'Quantum Systems',
    readTime: 6,
    date: 'OCTOBER 02, 2026',
    author: {
      name: 'Kairos Thorne',
      role: 'Staff Quantum Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      org: 'Institute for Quantum Computing, Waterloo'
    },
    coverImage: quantumCryoImg,
    coverImageAlt: 'Gleaming gold-plated quantum dilution refrigerator core with copper cabling',
    featured: false,
    trending: true,
    tags: ['Quantum', 'Cryogenics', 'Topological', 'Physics'],
    audioDuration: '7:15',
    views: '38.2k',
    initialClaps: 295,
    tableOfContents: [
      { id: 'beyond-nisq', label: '1. Leaving the Noise Floor Behind' },
      { id: 'braided-majorana', label: '2. Braiding Particles in 15 Millikelvin' },
      { id: 'catalyst-discovery', label: '3. Room-Temperature Nitrogenase Catalyst' }
    ],
    keyTakeaways: [
      'Topological protection shields quantum information against thermal decoherence through non-local spatial phase encoding.',
      'Cryogenic CMOS controllers integrated directly on the 4-Kelvin plate reduce 10,000 coaxial cables down to two optical ribbons.',
      'Targeted chemical simulation calculates nitrogen fixation transition states in 42 minutes versus 300,000 years on classical supercomputers.'
    ],
    sections: [
      {
        id: 'beyond-nisq',
        heading: '1. Leaving the Noise Floor Behind',
        content: [
          'For a decade, the quantum computing sector was trapped in an awkward transitional plateau: NISQ processors boasted impressive qubit counts, but physical gate errors required hundreds of error-correction overhead qubits for every functional calculation.',
          'The newly unveiled 1,024-logical-qubit system sidesteps brute-force surface codes by storing quantum states non-locally in pairs of Majorana zero modes at the terminals of semiconductor-superconductor hybrid nanowires.'
        ],
        callout: {
          type: 'code',
          title: 'Logical Error Gate Invariant',
          body: 'Logical Fidelity F_L >= 0.999999994 | Threshold P_Th: 1.2e-4 | T_Decoherence: 4.8 seconds',
          meta: 'Quantum Architecture Benchmark Q3-2026'
        }
      },
      {
        id: 'braided-majorana',
        heading: '2. Braiding Particles in 15 Millikelvin',
        content: [
          'When non-Abelian anyons swap geometric positions on a 2D plane, their quantum wavefunction undergoes a phase change that depends purely on the topology of their paths—not on local electromagnetic noise or minor cosmic rays. A local perturbation cannot flip a bit because the bit does not exist in any single spot.',
          'Operating at fifteen-thousandths of a degree above absolute zero, these topological braids remain stable for orders of magnitude longer than conventional transmon superconducting circuits.'
        ]
      },
      {
        id: 'catalyst-discovery',
        heading: '3. Room-Temperature Nitrogenase Catalyst',
        content: [
          'The immediate beneficiary of fault-tolerant quantum logic is materials chemistry. The Haber-Bosch chemical process for producing agricultural fertilizer currently consumes 2% of the entire world’s fossil fuel energy.',
          'In its maiden industrial benchmark run, the processor resolved the dynamic multi-reference active space of the FeMo-cofactor in nitrogenase enzyme, discovering an ambient iron-sulfur compound that produces ammonia at room temperature and pressure.'
        ]
      }
    ]
  },
  {
    id: 'synthetic-biology-biocomputing',
    slug: 'synthetic-biology-programmable-cellular-logic',
    title: 'The Living Logic Gate: Synthetic Biology Enters the Nanosecond Era',
    subtitle: 'By replacing digital transistors with enzymatic molecular cascades, synthetic biologists are building living biocells that compute in blood streams.',
    excerpt: 'Cells are nature’s most sophisticated manufacturing engines. Rewiring DNA transcription circuits into NOR and NAND gates has enabled single cells to identify cancerous circulating tumor micro-markers and synthesize custom bispecific antibodies on the spot.',
    category: 'Synthetic Biology',
    readTime: 8,
    date: 'SEPTEMBER 28, 2026',
    author: {
      name: 'Dr. Soraya Morales',
      role: 'Head of Synthetic Epigenetics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      org: 'BioFoundry Institute, Boston'
    },
    coverImage: synbioGlowImg,
    coverImageAlt: 'Bioluminescent synthetic living cells glowing emerald in high-tech scientific imagery',
    featured: false,
    trending: false,
    tags: ['SynBio', 'Biocomputing', 'CRISPR', 'Cellular Logic'],
    audioDuration: '9:30',
    views: '29.4k',
    initialClaps: 240,
    tableOfContents: [
      { id: 'genetic-nor-gates', label: '1. Compiling Boolean Code to DNA' },
      { id: 'autonomous-in-vivo', label: '2. Autonomous In-Vivo Immunotherapy' },
      { id: 'biocontainment', label: '3. Triple-Redundant Kill Switches' }
    ],
    keyTakeaways: [
      'CRISPR-Cas orthogonal repressors form stateful memory registers inside human T-cells that survive cell division.',
      'Biocellular computing consumes 10⁻¹⁸ Joules per molecular logic operation, a billion times less energy than digital silicon.',
      'Engineered auxotrophy ensures engineered organisms self-terminate within 40 seconds if removed from clinical medium.'
    ],
    sections: [
      {
        id: 'genetic-nor-gates',
        heading: '1. Compiling Boolean Code to DNA',
        content: [
          'What if an algorithm could reproduce, heal itself, and dissolve harmlessly into sugar when its calculations were complete? Synthetic biology has evolved beyond simple genetic editing into true biological hardware compilation.',
          'Using standardized transcriptional factor libraries, researchers compile C-like declarative logic directly into synthetic DNA plasmid sequences that execute Boolean evaluation inside living bacterial and mammalian hosts.'
        ],
        callout: {
          type: 'insight',
          title: 'Molecular Energy Density',
          body: 'One gram of synthetic DNA stores 215 Petabytes of encrypted data, requiring zero electrical power to maintain integrity across millennia.',
          meta: 'Epigenetics Review, 2026'
        }
      },
      {
        id: 'autonomous-in-vivo',
        heading: '2. Autonomous In-Vivo Immunotherapy',
        content: [
          'Instead of infusing patients with static chemotherapy drugs that cause systemic toxicity, engineered synthetic immune sentinel cells patrol the microvasculature. When a sentinel detects a combinatorial signature of tumor antigens (Antigen A AND Antigen B, but NOT Antigen C), it triggers localized enzymatic drug secretion.',
          'Early trial data demonstrates complete clearance of metastatic ovarian micro-colonies with zero off-target tissue damage.'
        ]
      },
      {
        id: 'biocontainment',
        heading: '3. Triple-Redundant Kill Switches',
        content: [
          'Biosafety concerns regarding engineered living organisms are addressed through absolute metabolic containment. The organisms are synthesized with synthetic amino acids not found in nature; without synthetic nutrient feed, their ribosome machinery stalls and triggers programmed autolytic cell lysis.'
        ]
      }
    ]
  },
  {
    id: 'embodied-humanoid-robotics',
    slug: 'embodied-ai-humanoid-physical-world-foundation-models',
    title: 'Kinematic Intuition: How Video Foundation Models Solved Bipedal Dexterity',
    subtitle: 'Humanoid robots no longer rely on rigid inverse kinematics. By pre-training on 100,000 hours of human first-person video, robots have developed subconscious physical intuition.',
    excerpt: 'Watch an android slip on an oil slick: it no longer freezes and crashes. It stumbles, windmills its arms, rotates its center of mass, and catches itself with instinctive elegance. The convergence of spatial transformers and high-torque electric actuators has breached the physical dexterity barrier.',
    category: 'Humanoid Robotics',
    readTime: 6,
    date: 'SEPTEMBER 21, 2026',
    author: {
      name: 'Nikhil Ranganathan',
      role: 'VP of Robotics & Dynamic Systems',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      org: 'Vanguard Dynamics, Tokyo'
    },
    coverImage: humanoidLabImg,
    coverImageAlt: 'Bipedal titanium and carbon fiber humanoid robot in a minimalist modern lab',
    featured: false,
    trending: true,
    tags: ['Robotics', 'Embodied AI', 'Foundation Models', 'Actuators'],
    audioDuration: '7:40',
    views: '54.1k',
    initialClaps: 410,
    tableOfContents: [
      { id: 'death-of-motion-planning', label: '1. The Death of Handcrafted Motion Planning' },
      { id: 'harmonic-torque-density', label: '2. Quasi-Direct Drive Actuator Physics' },
      { id: 'factory-to-home', label: '3. Crossing from Structured to Unstructured Worlds' }
    ],
    keyTakeaways: [
      'End-to-end vision-action models generate 120Hz motor trajectory tokens directly from stereo camera feeds without intermediate geometric maps.',
      'Planetary cycloidal gearboxes achieve 180 Nm/kg torque density with 98% backdrivability, making human impact inherently compliant.',
      'Zero-shot generalization allows robots to fold unfamiliar textiles, manipulate delicate glassware, and climb slippery terrain without retraining.'
    ],
    sections: [
      {
        id: 'death-of-motion-planning',
        heading: '1. The Death of Handcrafted Motion Planning',
        content: [
          'For six decades, roboticists wrote mathematical equations of motions: differential kinematics, Lagrangian dynamics, zero-moment point trajectories. If a chair was bumped 3 centimeters to the left, the entire model crashed with singularity errors.',
          'The revolution in humanoid robotics happened when researchers stopped writing physics models and started feeding transformer architectures raw video tokens paired with joint torque telemetry. The robot learned intuitive physics the same way a human toddler does: by observing and attempting hundreds of thousands of micro-actions.'
        ]
      },
      {
        id: 'harmonic-torque-density',
        heading: '2. Quasi-Direct Drive Actuator Physics',
        content: [
          'Software without compliant hardware is useless. High-ratio planetary gearings are too brittle and lock up under sudden shocks. Quasi-direct drive electric motors, coupled with carbon fiber tendon cables, allow humanoid limbs to give and spring back naturally when struck.'
        ]
      }
    ]
  },
  {
    id: 'deep-space-autonomous-telescopes',
    slug: 'deep-space-nuclear-ion-propulsion-oort-cloud',
    title: 'Beyond the Heliopause: The Autonomous Nuclear-Ion Fleet to the Oort Cloud',
    subtitle: 'Equipped with micro-fusion fission fragment reactors, deep space probes are accelerating to 1% the speed of light to map the interstellar frontier.',
    excerpt: 'Chemical rockets cannot reach interstellar distances within a human career. The deployment of high-isp nuclear-electric ion thrusters has reduced transit times to the Kuiper Belt from 12 years to 18 months, turning the outer solar system into an accessible astronomical baseline.',
    category: 'Deep Space',
    readTime: 9,
    date: 'SEPTEMBER 14, 2026',
    author: {
      name: 'Dr. Caelan Mercer',
      role: 'Astrophysics & Propulsion Fellow',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      org: 'Jet Propulsion Consortium, Pasadena'
    },
    coverImage: deepSpaceImg,
    coverImageAlt: 'Cinematic deep space robotic probe gliding past the rings of Saturn',
    featured: false,
    trending: false,
    tags: ['Space', 'Astrophysics', 'Nuclear Propulsion', 'Interstellar'],
    audioDuration: '10:10',
    views: '31.6k',
    initialClaps: 278,
    tableOfContents: [
      { id: 'propulsion-paradox', label: '1. Escaping the Chemical Tsiolkovsky Trap' },
      { id: 'gravitational-lensing', label: '2. The Solar Gravitational Lens Telescope' }
    ],
    keyTakeaways: [
      'Nuclear-thermal magnetoplasmadynamic engines produce continuous specific impulse (Isp) of 12,000 seconds over 5 consecutive years.',
      'Placing an optical sensor array at the solar gravitational focal point (550 AU) resolves continents and weather on exoplanets 40 light-years away.',
      'Onboard autonomous edge agents navigate gravitational slingshots without relying on 14-hour round-trip Earth radio communication.'
    ],
    sections: [
      {
        id: 'propulsion-paradox',
        heading: '1. Escaping the Chemical Tsiolkovsky Trap',
        content: [
          'The rocket equation is unforgiving: to push chemical propellant fast enough to leave our sun’s gravitational well requires exponential fuel mass that rapidly exceeds the payload weight. Deep space exploration requires energy density millions of times greater than liquid methane or hydrogen.',
          'By leveraging sub-critical magnetic fission fragment drives, the new Prometheus-IV probes achieve steady acceleration for 700 continuous days, reaching speeds exceeding 3,000 kilometers per second.'
        ]
      },
      {
        id: 'gravitational-lensing',
        heading: '2. The Solar Gravitational Lens Telescope',
        content: [
          'At 550 Astronomical Units from Earth, the sun’s massive gravity acts as a colossal magnifying lens, bending light rays from distant stars into a single razor-sharp focal line. A modest 1-meter space telescope positioned along this optical corridor gains the resolving power of an Earth-sized telescope mirror, transforming exoplanet surfaces from single blurry pixels into 1000x1000 pixel direct color maps.'
        ]
      }
    ]
  }
];

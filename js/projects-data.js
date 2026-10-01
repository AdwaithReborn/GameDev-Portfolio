/* ==========================================================================
   PROJECTS DATA REPOSITORY
   Easy to update, expand, or add new Unreal Engine / Unity / Blender projects!
   ========================================================================== */

const PROJECTS_DATA = {
  'hunger-boy': {
    id: 'hunger-boy',
    title: 'Hunger Boy',
    genre: '2D Precision Platformer · Survival Mechanics',
    engine: 'Unity 2022 LTS',
    language: 'C#',
    category: 'unity',
    banner: 'assets/images/hunger-boy-banner.svg',
    summary: 'A fast-paced, responsive 2D precision platformer with a tense survival loop. Players dash, wall-jump, and evade hazards while managing a depleting hunger meter.',
    role: 'Solo Developer (Gameplay Programming, Level Design, Audio & Juice)',
    timeline: 'Completed / Active Polish',
    overview: `Hunger Boy is a fast-paced 2D platformer engineered around a dynamic starvation mechanic. Unlike traditional platformers where health is static until damage is taken, Hunger Boy features an active metabolic decay loop—your hunger constantly drains, diminishing your jump height and movement speed unless you feed on meat and fruit scattered across high-stakes obstacle courses. Consuming food triggers temporary adrenaline surges, granting explosive dashes and wall-rebound capabilities needed to cross massive spike chasms.`,
    features: [
      'Custom 2D Kinematic Controller: Zero-latency input with coyote time, jump buffering, wall-sliding, and variable jump curve.',
      'Hunger & Stamina Decay Loop: Dynamic state management where metabolic depletion progressively restricts player movement capability.',
      'Tilemap Hazards & Physics: Modular trap triggers, crumbly platforms, spike colliders, and springboards.',
      'Enemy Patrol AI: Finite State Machine (FSM) patrol nodes, line-of-sight raycasting, and alert states.',
      'Juice & Game Feel: Camera shake via Cinemachine, squash & stretch animations, landing particle bursts, and hit-stop impact frames.'
    ],
    techStack: [
      { name: 'Unity 2022 LTS', desc: 'Core game engine, Tilemaps, 2D Physics' },
      { name: 'C# Architecture', desc: 'Event-driven decoupling, scriptable objects' },
      { name: 'Cinemachine', desc: 'Dynamic camera framing & screen shake impulse' },
      { name: 'Object Pooling', desc: 'Zero GC allocs for particles & projectiles' }
    ],
    challenges: [
      'Engineered a custom 2D raycast-based collision solver to eliminate edge-snagging issues common with default Unity BoxColliders.',
      'Balanced metabolic decay curves to create constant tension without frustrating player exploration.'
    ],
    links: {
      demo: '#',
      repo: '#',
      hasPlayable: false
    }
  },

  'meat-train': {
    id: 'meat-train',
    title: 'Meat Train',
    genre: '3D First-Person Survival Horror · Tactical Shooter',
    engine: 'Unity (HDRP / URP)',
    language: 'C#',
    category: 'unity',
    banner: 'assets/images/meat-train-banner.svg',
    summary: 'A gritty, claustrophobic 3D survival FPS set aboard a speeding, mutant-infested train hurtling through an apocalyptic wasteland.',
    role: 'Lead Gameplay Programmer & 3D Asset Modeler',
    timeline: 'Completed Prototype / Feature Expansion',
    overview: `Meat Train plunges players into a nightmare aboard an armored locomotive hurtling through a radioactive wasteland. Inside the narrow, claustrophobic carriages, grotesque biological horrors have breached containment. Players must conserve scarce shotgun shells, manage flashlight battery drain, and systematically clear carriage after carriage to reach the locomotive controls. Tension is amplified through spatial 3D audio, dynamic flickering emergency lighting, and an intelligent enemy AI system that responds to player footsteps and gunfire echoes.`,
    features: [
      'Tactical FPS Controller: Procedural weapon sway, true iron-sight aiming (ADS), recoil kickback patterns, and magazine state machines.',
      'Survival Economy: Severe ammo constraints, medkit triage, flashlight battery decay, and risk-reward scavenging.',
      'Dynamic NavMesh AI: Moving frame-of-reference pathfinding, hearing perception radius, sensory vision cones, and flank behavior.',
      'Atmospheric Volumetric Lighting: Real-time shadow casters, flickering fluorescents, and volumetric fog corridors.',
      'Custom Blender 3D Assets: Shotguns, railguns, ammunition crates, and modular carriage walls modeled in Blender and textured in PBR.'
    ],
    techStack: [
      { name: 'Unity URP / HDRP', desc: 'Volumetric fog, custom post-processing & LUTs' },
      { name: 'C# Gameplay Systems', desc: 'FSM AI, weapon ballistic systems & audio occlusion' },
      { name: 'Blender 3D Pipeline', desc: 'Hard-surface weapon modeling & environment kitbash' },
      { name: 'NavMesh Components', desc: 'Real-time dynamic obstacle carving and pathfinding' }
    ],
    challenges: [
      'Implemented custom coordinate transforms to handle physics and AI navigation inside a high-speed moving train interior.',
      'Tuned audio occlusion filters to simulate muffled sounds through heavy steel carriage bulkheads.'
    ],
    links: {
      demo: '#',
      repo: '#',
      hasPlayable: false
    }
  },

  'unreal-vanguard': {
    id: 'unreal-vanguard',
    title: 'Project: Horizon Vanguard',
    genre: 'Third-Person Action / Sci-Fi Prototype',
    engine: 'Unreal Engine 5',
    language: 'C++ & Blueprints',
    category: 'unreal',
    banner: 'assets/images/unreal-engine-banner.svg',
    summary: 'Upcoming Unreal Engine 5 prototype exploring high-fidelity combat mechanics, Nanite geometry, Lumen real-time lighting, and GAS abilities.',
    role: 'Gameplay Systems Programmer & Technical Designer',
    timeline: 'Currently In Prototyping',
    overview: `Project Horizon Vanguard is an active Unreal Engine 5 technical prototype focused on responsive third-person combat and fluid locomotion. Designed to test the limits of modern engine architecture, the project implements the Gameplay Ability System (GAS) for modular status effects, cooldowns, and combat combos. Real-time global illumination powered by Lumen delivers cinematic atmosphere without pre-baked lightmaps, paired with Nanite virtualized geometry for cinematic-grade hard-surface environments.`,
    features: [
      'Gameplay Ability System (GAS): Modular attribute sets (Health, Shields, Stamina) with networked tag gameplay cues.',
      'Lumen & Nanite Workflow: Real-time indirect bounce lighting and ultra-dense micro-polygon environment modeling.',
      'Enhanced Input & Locomotion: Fluid motion matching, directional dashing, and procedural weapon offsets.',
      'Blender to UE5 Pipeline: FBX/USD asset pipeline utilizing auto-LODs and Nanite compatibility.'
    ],
    techStack: [
      { name: 'Unreal Engine 5', desc: 'Lumen GI, Nanite Virtual Geometry & Chaos Physics' },
      { name: 'C++ & Blueprints', desc: 'Core ability architecture in C++, visual scripting in Blueprints' },
      { name: 'Gameplay Ability System', desc: 'Attribute Sets, Gameplay Effects & Cooldown Tags' },
      { name: 'Niagara VFX', desc: 'GPU particle impacts, muzzle flashes, and energy shields' }
    ],
    challenges: [
      'Architecting clean C++ base classes with Blueprint-exposed variables for rapid designer iteration.',
      'Balancing high-density geometry with rock-solid 60+ FPS frame times using UE5 profiling tools.'
    ],
    links: {
      demo: '#',
      repo: '#',
      hasPlayable: false
    }
  }
};

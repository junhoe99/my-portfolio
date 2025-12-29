import type { Project, SkillCategory } from '../types';
import { ProjectCategory } from '../types';

export const PROFILE_DATA = {
  name: "김준회 (Junhoe Kim)",
  role: "System Semiconductor Design & Verification Engineer",
  summary: "RTL 설계부터 UVM 검증까지, 하드웨어의 신뢰성을 책임지는 엔지니어입니다. ",
  email: "junhoe99@gmail.com",
  phone: "010-4806-2976",
  github: "https://github.com/junhoe99",
  education: "단국대학교 (전자전기공학부)",
  location: "경기도 용인시 수지구",
  resumeUrl: "/resume.pdf", // Placeholder
  awards: [
    {
      title: "미래형 자동차 캡스톤 디자인 경진대회 우수상",
      organization: "한국생산제조학회",
      date: "2024.11",
      description: "Ion Battery NDT(Non-Destructive Testing) 시스템 개발 프로젝트로 참여한 경진대회에서 우수상 수상"
    },
    {
      title: "캡스톤 디자인 경진대회 동상",
      organization: "단국대학교",
      date: "2024.12",
      description: "Ion Battery NDT(Non-Destructive Testing) 시스템 개발 프로젝트로 참여한 경진대회에서 동상 수상"
    }
  ]
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    categoryName: "Languages",
    items: ["Verilog", "SystemVerilog", "C", "Python", "Tcl"]
  },
  {
    categoryName: "Verification",
    items: ["UVM", "Coverage Driven Verification(CDV)", "Assertion (SVA)"]
  },
  {
    categoryName: "EDA Tools & FPGA",
    items: ["Vivado","VCS", "Verdi",  "Xilinx FPGA"]
  },
  {
    categoryName: "Protocols",
    items: ["AMBA AXI4-Lite", "AMBA APB", "I2C", "SPI", "UART"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "ion-battery-ndt",
    title: "초음파 기반 Ion Battery NDT Diagnosis System",
    period: "2024.03 ~ 2024.12",
    teamSize: "Team of 4",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "battery_ndt_pic.jpg",
    summary: "초음파를 이용하여 배터리의 SoH(State of Health)를 비파괴적으로 진단하는 시스템을 개발했습니다. FPGA 기반 Pulser Control Logic을 설계하여 정밀한 초음파 신호를 생성하고, CDC 환경에서의 메타스테이블리티 문제를 해결했습니다.",
    featured: true,
    
    gallery: [
      {
        type: 'image' as const,
        url: "overview_1.jpg",
        caption: "System Overview - 배터리 열화 시, SoH(State of Health)의 변화를 비파괴적으로 진단",
      },
    ],
    
    overview: `📍 열화가 발생한 Li-ion 배터리 내부의 SEI(Solid Electrolyte Interphase) layer 성장을 초음파로 비파괴적으로 측정합니다.
              📍 HV7321 Pulser Board를 FPGA로 제어하여 안정적인 초음파 펄스 신호를 생성합니다.`,
    
    role: [
      {
        title: "1. Hypothesis 수립 및 논문 분석",
        images: [
          "hypothesis.jpg"
        ],
        description: `✅**Hypothesis 수립**: 열화가 발생한 Li-ion 배터리 내부는 그 상태가 변할 것이고, 초음파로 이를 비파괴적으로 확인 가능할 것이다.<br/><br/>✅**논문 분석**: "Theory of SEI Formation in Rechargeable Batteries" 논문을 통해 배터리 열화 시 SEI layer가 성장함을 확인.<br/><br/>✅**초음파의 역할**: SoH가 낮은 배터리의 경우, SEI층이 더욱 성장해서 내부의 밀도가 증가. 초음파는 이에 반응하여 파장이 길어지고, 신호 강도가 약해짐.`,
      },
      {
        title: "2-1-1. HV7321 Pulser Board 선택 및 Datasheet 분석",
        images: [
          "hv7321.jpg",
          "hv_system_block_diagram.jpg",
          "hv_system_block_diagram_1.jpg"
        ],
        description: `✅HV7321 Pulser Board의 Datasheet를 분석 및 전체 시스템 블록 다이어그램 작성`,
      },
      {
        title: "2-1-2. Pin-mapping 및 Block Diagram 설계",
        images: [
          "hv_pin_mapping.jpg",
          "hv_block_diagram.jpg"
        ],
        description: `✅FPGA와 Pulser Board 간 Pin-mapping 및 신호 연결 설계<br/><br/>✅전체 시스템 Block Diagram 구성`,
      },
      {
        title: "2-2-1. FSM 설계",
        images: [
          "hv_board_fsm.jpg",
          "hv_fsm_diagram.jpg"
        ],
        description: `✅펄스 생성 메커니즘: 각 state에서 counter를 활용해 POS0, NEG0 제어 (5ns 주기로 1씩 감소)`,
      },
      {
        title: "2-2-2. Control Logic 구현",
        images: [
          "hv_timing_diagram.jpg"
        ],
        description: `**🔹 펄스 생성 메커니즘**<br/>
• 각 state에서 counter로 POS0, NEG0 제어<br/>
• pos_counter: Positive 펄스 폭 제어<br/>
• neg_counter: Negative 펄스 폭 제어<br/>
• RTZ_counter: Return-to-Zero 시간 제어 (25ns)<br/><br/>

**🔹 신호 전달**<br/>
• FPGA PORT C 핀을 통해 HV7321 Pulser Board TP로 신호 전달<br/>
• Pin-mapping을 통한 안정적인 하드웨어 연결<br/><br/>

**🔹 Burst Mode**<br/>
• burst_counter로 펄스 반복 제어<br/>
• 0이면 rx 상태로 전환, 아니면 pos 상태로 복귀하여 펄스 반복 생성<br/><br/>

**🔹 타이밍 설정**<br/>
• Pulse 생성 FSM 클럭: 200MHz (5ns 분해능)<br/>
• 주파수 범위: 1~수십MHz (counter 값으로 조절)`,
      },
      {
        title: "2-3. Simulation 및 검증",
        images: [
          "hv_simulation.jpg",
          "hv_timing_diagram_2.jpg"
        ],
        description: `✅Board Waveform 및 timing diagram과 Simulation 파형을 비교하여 FSM 동작 검증<br/><br/>✅200MHz 클럭 기반의 정밀한 타이밍 제어로 초음파 생성`,
      }
    ],
    results: `✅주요 성과<br/><br/>초음파 기반 배터리 SoH 진단 시스템의 하드웨어 제어 로직을 성공적으로 구현했습니다.<br/><br/>🏆 수상 내역<br/><br/>• 미래형 자동차 캡스톤 디자인 경진대회 우수상 (한국생산제조학회)<br/>• 단국대학교 캡스톤 디자인 경진대회 동상`,
    resultImages: [
      "hv_final_system.jpg",
      "hv_result.gif"
    ],
    troubleshooting: [
      {
        problem: "간헐적으로 펄스 생성 누락 및 ADC 수집 지연 현상이 발생.",
        analysis: "1. 클럭이 다른 두 도메인 간 신호 전달 시 샘플링 누락 및 metastability 위험 발생<br/><br/>2. 시스템은 이중 FSM 구조로, 40MHz로 동작하는 Main Controller logic이 전체 시퀀스를 관리하고, 200MHz로 동작하는 Pulser Control이 정밀 펄스를 생성하는 CDC 구조입니다.<br/><br/>3. pulse 생성이 끝난 후, pulser control logic에서 tx_done 신호를 200MHz 기준 1clk 동안 활성화하는데, 이 신호를 main control logic이 제대로 수신해야 rx 모드로 넘어가게 됩니다.<br/><br/>4. 그런데 Main Controller Logic 입장에서는 이 tx_done 신호가 매우 짧은 주기 동안만 발생하는 pulse 형태의 신호이기 때문에 간헐적으로 이 신호를 놓치는 현상이 발생했고, 이로 인해 ADC 수집 동작이 틀어났음을 알 수 있었습니다.",
        solution: "**1. CDC 환경에서의 sampling 문제 해결:**<br/><br/>• 200MHz, 40MHz 신호는 5배 정도의 주기 차이를 가짐<br/>• 이를 보장하고자 별도의 tx_done_counter를 배치하여, tx_done 신호를 latching함으로써 main control logic에서 tx_done 신호를 더욱 확실하게 sampling할 수 있도록 처리<br/><br/>**2. Metastability 해결:**<br/><br/>• 5clk 동안 stretching 된 tx_done 신호를 2-stage synchronizer + edge detector를 통해 tx_done_posedge 신호로 생성<br/>• 이 신호를 main control logic에서 사용함으로써 rx mode로의 전환에서 문제가 생기지 않도록 해줌",
        result: "1. CDC 환경에서 Pulse Stretching 및 2-stage Synchronizer 기법을 직접하여 샘플링 성공률 100% 달성 및 metastability 제거<br/><br/>2. 통해, 신호 전달 순간 샘플링 시 발생 가능한 metastability. 2-stage synchronizer로 안정화, edge detector로 깨끗한 펄스로 변환<br/><br/>3. 결과적으로 100회 연속 측정에서 100% 성공했으며, 추가 지연만 75ns(전체의 0.15%)로 무시 가능한 수준임을 확인."
      }
    ],
    techStack: ["Verilog", "Xilinx Vivado", "HV7321 Pulser Board", "FSM Design", "CDC"],
    links: [
     
    ]
  },
  {
    id: "dual-fpga-pingpong",
    title: "FPGA 기반 RGB Dice Game ",
    period: "2025.06.03 ~ 2025.06.12",
    teamSize: "Team of 4",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "p1_pic.jpg",
    summary: "두 개의 FPGA 보드를 I2C 프로토콜로 연결하여 실시간 상호작용이 가능한 탁구 게임을 RTL로 구현하였습니다.",
    featured: true, // 주요 프로젝트로 표시
    
    // 3-Stage Demo Gallery
    gallery: [
      {
        type: 'gif' as const,
        url: "intro.jpg",
        caption: "Game Intro ",
      },
      {
        type: 'gif' as const,
        url: "filter_demo.jpg", 
        caption: "Game 동작 - CAM1 : RGB 색상 인식, CAM2 : 사용자 실시간 인식 및 filter 적용",
      },
      {
        type: 'gif' as const,
        url: "finish.jpg",
        caption: "Finish - 게임 완료 및 결과",
      }
    ],
    
    overview: `📍 SCCB Interface를 활용해 OV7670 카메라 모듈을 초기화하고, RGB 색상 인식을 통해 플레이어가 이동합니다.
              📍 각자 다른 색상의 주사위를 가지고 게임을 진행하며, 실시간 영상 처리와 VGA 출력을 통해 직관적인 게임플레이를 제공합니다.
              📍 각자 설계한 필터를 사용자의 실시간 영상에 적용하는 기능을 구현했습니다.`,
    
    role: [
      {
        title: "Color Detection Module 설계 및 구현",
        images: [
          "color_detect.jpg"
        ],
        description: `✅**ROI_Color_Detector**: 특정 공간(ROI)의 변환을 통해 실시간 RGB 색상을 인식하고, 인식 결과를 생성하는 모듈.<br/><br/>✅**Color_Result_Manager**: 조명 변화 및 카메라 노이즈로 인한 noise에 대해 노이즈 필터을 적용.`,
      },
      {
        title: "ASCII 패턴 필터 모듈 설계 및 구현", 
        description: `✅실시간 영상에 ASCII 아트 효과를 적용하는 필터 모듈을 설계했습니다.<br/><br/>✅픽셀 밝기값을 8단계로 나누고, 밝기별로 각기 다른 ASCII 패턴을 적용했습니다.`,
        images: [
          "filter_application.jpg"
        ]
      },
      {
        title: "프로젝트 발표", 
        images: [
          "presentation.jpg"
        ]
      }
    ],
    results: "Dice의 색상을 감지하는 카메라, 사용자의 실시간 영상을 처리하는 두개의 카메라를 성공적으로 제어하여, 게임의 목표동작을 성공적으로 구현했습니다.",
    troubleshooting: [
      {
        problem: "주사위를 한번만 던졌음에도, 게임 말이 순식간에 맵을 통과해서 게임이 끝나버리는 현상 발생.",
        problemImage: "VGA_p1.jpg",
        analysis: "1. 기존의 Color_Detector 설계는 Color Detecting 후, 그 값을 곧바로 Game Logic 모듈로 전달. <br/><br/>2. 카메라의 미세한 노이즈나 손떨림으로 인해 잘못된 색상을 간헐적으로 감지하여 전달.",
        solution: "1. Color_Result_Manager 모듈을 추가하고, 'Voting 알고리즘'을 도입<br/><br/> 2. 연속된 3개의 Frame 동안 감지된 색상을 저장하고, 가장 많이 감지된 색상을 최종적인 Stable Color로 확정<br/><br/>3. 이를 통해 일시적인 노이즈나 잘못된 감지로 인한 오동작을 효과적으로 방지.",
        solutionImage: "VGA_S1.jpg",
        result: "1. 색상 인식 동작이 안정화되어, 게임 플레이 중 잘못된 색상 인식으로 인한 오동작이 완전히 해결되었습니다. <br/><br/>2. 게임의 신뢰성과 사용자 경험이 크게 향상되었습니다."
      }
    ],
    techStack: ["Verilog", "Xilinx Vivado", "I2C", "VGA"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/ov7670-dice-race', label: 'Source Code' },
      { type: 'doc', url: 'FPGA_DiceGame_Project_Final.pdf', label: '참고문서 PDF' }
    ]
  },
  {
    id: "AMBA APB-uvm",
    title: "AMBA APB Protocol UVM Verification",
    period: "2025.12.08 ~ 2025.12.14",
    teamSize: "Solo",
    tags: [ProjectCategory.VERIFICATION],
    thumbnail: "p2_pic.jpg",
    summary: "UVM 방법론을 적용하여 AMBA APB 프로토콜 기반의 APB System 검증환경을 구축하였습니다. Constrained Random Testing과 Functional Coverage를 통해 100% Code Coverage를 달성했습니다.",
    featured: false,
    
    gallery: [
      {
        type: 'image' as const,
        url: "apb_block_diagram.jpg",
        caption: "APB System Architecture & UVM Testbench Block Diagram",
      },
      {
        type: 'image' as const,
        url: "uvm_architecture.jpg", 
        caption: "UVM Components - Agent, Scoreboard, Coverage Collector",
      },
      {
        type: 'image' as const,
        url: "apb_coverage_results.jpg",
        caption: "Final Coverage Report - 100% Code Coverage, 95%+ Functional Coverage",
      }
    ],
    
    overview: `이 프로젝트는 **UVM 방법론 기반 AMBA APB 프로토콜 검증** 프로젝트입니다. Constrained Random Testing과 Functional Coverage를 통해 체계적인 검증 환경을 구축하고, 100% Code Coverage를 달성했습니다.`,
    
    role: [
      {
        title: "1. Project Objective",
        description: `UVM(Universal Verification Methodology) 방법론을 적용하여 AMBA APB 프로토콜에 대한 체계적인 검증 환경을 구축합니다.\n Constrained Random Testing과 Functional Coverage 기반 검증을 통해 DUT의 신뢰성을 검증하는 것을 목표로 합니다.`
      },
      {
        title: "2. Project Overview",
        images: ["apb_dut_block_diagram.jpg", "apb_uvm_architecture.jpg"],
        description: `**DUT Block Diagram**<br/><br/>DUT인 APB Master는 FSM, Address Decoder, MUX로 구성됩니다:<br/><br/>- **FSM**: APB Protocol 생성<br/>- **Address Decoder**: PADDR를 기반으로 PSEL 신호 생성<br/>- **MUX**: PRDATA, PREADY 신호 조절 <br/><br/>**UVM Testbench Block Diagram**<br/><br/>체계적인 검증을 위한 UVM 컴포넌트 구조:<br/><br/>- **APB Master Agent**: Driver, Monitor, Sequencer<br/>- **APB Slave Agent**: Passive Monitor<br/>- **Scoreboard**: 예상 결과와 실제 결과 비교<br/>- **Coverage Collector**: Functional/Code Coverage 수집<br/>- **Reference Model**: 예상 동작 모델링<br/><br/>**핵심 Protocol(SVA)**<br/><br/>SystemVerilog Assertion을 통해 APB 프로토콜의 핵심 동작을 실시간 검증:<br/><br/>**1. FSM State Transition 검증**<br/>- SETUP 상태(PSEL=1, PENABLE=0)에서 다음 클록에 반드시 ACCESS 상태(PENABLE=1)로 전이<br/>- 프로토콜의 2-phase handshake 메커니즘 준수 확인<br/><br/>**2. Address Stability 검증**<br/>- PSEL 활성화 이후 PADDR 신호의 안정성 보장<br/>- SETUP phase 동안 주소 변경 방지<br/><br/>**3. Write Data Stability 검증**<br/>- Write 동작(PWRITE=1) 및 ACCESS phase(PENABLE=1) 시 PWDATA 안정성 보장<br/>- 데이터 무결성 유지 확인<br/><br/>**4. PSEL One-Hot 검증**<br/>- 다중 Slave 중 최대 하나만 선택되는 상호 배타성(Mutual Exclusivity) 검증<br/>- 복수 Slave 동시 선택으로 인한 버스 충돌 방지<br/><br/>**Project Hierarchy**<br/>\`\`\`<br/>📁APB_UVM/<br/>├── 📂 tb/<br/>│   ├── apb_test.sv              # Test 시나리오<br/>│   ├── apb_env.sv               # UVM Environment<br/>│   ├── apb_agent.sv             # Master/Slave Agent<br/>│   ├── apb_driver.sv            # APB 트랜잭션 구동<br/>│   ├── apb_monitor.sv           # 프로토콜 모니터링<br/>│   ├── apb_sequencer.sv         # 시퀀스 관리<br/>│   ├── apb_sequence.sv          # Test Sequence<br/>│   ├── apb_scoreboard.sv        # 결과 검증<br/>│   └── apb_coverage.sv          # Coverage Collector<br/>├── 📂 rtl/<br/>│   ├── apb_master.sv            # APB Master DUT<br/>│   ├── apb_slave.sv             # APB Slave DUT<br/>  <br/>\`\`\``
      },
      {
        title: "3. Report",
        images: ["apb_report_waveform.jpg", "apb_report_log.jpg", "apb_report_coverage.jpg"],
        description: `**Simulation Waveform**<br/><br/>APB 프로토콜 신호 파형 및 트랜잭션 동작 확인<br/><br/>**UVM Log Messages**<br/><br/>시뮬레이션 실행 로그:<br/>- UVM 상태 메시지 (UVM_INFO, UVM_WARNING, UVM_ERROR)<br/>- UVM Topology 계층 구조 출력<br/>- Test 실행 결과 요약<br/><br/>**Coverage Report**<br/><br/>검증 완료도 수치:<br/>- Functional Coverage: 100%<br/>- Code Coverage: Line, Branch, Condition 커버리지 통계`
      }
    ],
    results: "100% Code Coverage 및 95% 이상의 Functional Coverage를 달성했습니다. Corner Case(Reset 직후 트랜잭션, 연속 Write/Read 등)에서 발생한 DUT의 오동작 버그 3건을 발견하고 수정 제안서를 작성했습니다.",
    troubleshooting: [
      {
        problem: "Assertion에 의한 Error Message가 미출력.\n\n• SystemVerilog Assertions(SVA)가 실제로 프로토콜 위반을 정확히 탐지할 수 있는가?\n• 검증 환경 자체가 제대로 동작하는지 어떻게 검증할 것인가? (Meta-verification)",
        problemImage: "./projects/apb-uvm/meta_verification_concept.jpg",
        analysis: "DUT(APB_Master)는 이미 Hardware-level에서 검증된 모듈이기 때문에, 정상 테스트만으로는 Assertion의 Error 탐지 능력을 검증할 수 없었습니다.",
        analysisImage: "./projects/apb-uvm/protocol_violations.jpg",
        solution: "**1. UVM Factory Override 패턴 활용한 Error 테스트 생성**\n\n• apb_error_driver 클래스 구현\n• 기존 Test Component 재사용하면서 Driver만 선택적 교체\n\n**2. Error Injection 메커니즘 (force/release 활용)**\n\n• inject_psel_onehot_error(): Multiple PSEL 동시 force → One-Hot 속성 위반\n• inject_address_stability_error(): SETUP phase 중 PADDR 변경\n• inject_wdata_stability_error(): ACCESS phase 중 PWDATA 변경\n\n**3. Test Reusability 확보**\n\n• config_db를 통한 Error Mode 제어\n• +UVM_TESTNAME 커맨드라인 스위칭으로 Normal/Error Test 전환\n**4. AMBA APB Specification v2.0 분석하여, 3가지 주요 Protocol Violation 선정:**\n\n• **PSEL One-Hot Violation** (Spec Section 2.1)\n  - 복수 Slave 동시 선택 위반\n\n• **Address Stability Violation** (Spec Section 2.2 SETUP phase)\n  - PADDR 신호 변경 위반\n\n• **Write Data Stability Violation** (Spec Section 2.2 ACCESS phase)\n  - PWDATA 신호 변경 위반\n\n",
        solutionImage: "./projects/apb-uvm/error_injection_architecture.jpg",
        result: "**정량적 성과**\n\n• 총 80개의 UVM_ERROR 메시지 생성 성공\n• 모든 SVA Properties의 Error 탐지 능력 검증 완료\n\n**각 Error Type별 검증 결과**\n\n✅ **PSEL one-hot violation**: $onehot0() 함수 정상 동작\n✅ **Address stability violation**: $stable(PADDR) Property가 SETUP phase 위반 탐지\n✅ **Write data stability violation**: $stable(PWDATA) Property가 ACCESS phase 위반 탐지\n\n**기술적 의의**\n\n• Verification Environment의 신뢰성 정량적 입증\n• Meta-verification 개념의 실제 구현 사례\n• Specification-grounded Technical Decision Making 능력 증명",
        resultImage: "./projects/apb-uvm/assertion_results.jpg"
      }
    ],
    techStack: ["SystemVerilog", "UVM", "VCS", "Verdi"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/axi4-lite-uvm', label: 'Source Code' }
    ]
  },
  {
    id: "rv32i-risc-v-cpu",
    title: "Multi Cycle RV32I RISC-V Processor",
    period: "2025.09 ~ 2025.10",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "p3_pic.jpg",
    summary: "SystemVerilog HDL기반 RV32I RISC-V 프로세서 설계 프로젝트입니다. 32비트 RISC-V ISA의 기본 명령어들을 지원하며, 파이프라인 없이 multi cycle 구현으로 설계했습니다.",
    featured: false,
    
    gallery: [
      {
        type: 'image' as const,
        url: "riscv_block_diagram.jpg",
        caption: "Block Diagram - CPU Core, Memory System, Control & Datapath",
      },
      {
        type: 'image' as const,
        url: "riscv_hierarchy.jpg", 
        caption: "Project Hierarchy - RV32I_TOP, CPU Core, Memory Modules",
      },
      {
        type: 'image' as const,
        url: "riscv_waveform.jpg",
        caption: "Simulation Results - RV32I Instruction Execution Waveform",
      }
    ],
    
    overview: `이 프로젝트는 **SystemVerilog HDL기반 RV32I RISC-V 프로세서** 설계 프로젝트입니다. 32비트 RISC-V ISA의 기본 명령어들을 지원하며, 파이프라인 없이 multi cycle 구현으로 설계했습니다.`,
    
    role: [
      {
        title: "1. Project Objective",
        description: `이 프로젝트는 **SystemVerilog HDL기반 RV32I RISC-V 프로세서** 설계 프로젝트입니다. 32비트 RISC-V ISA의 기본 명령어들을 지원하며, 파이프라인 없이 multi cycle 구현으로 설계했습니다.`
      },
      {
        title: "2. Project Overview",
        images: ["riscv_block_diagram.jpg"],
        description: `**Block Diagram**<br/><br/><img width="6660" height="5168" alt="image" src="https://github.com/user-attachments/assets/7e7cf06e-dcfa-4790-b0a1-7a36c41b06f0" /><br/><br/>**Project Hierarchy**<br/>\`\`\`<br/>📁RV32I_RISC_V/<br/>├── 📂 RV32I_TOP.sv           # 최상위 프로세서 모듈<br/>│   └── 🗂️cpu_core.sv          # CPU 코어 (제어+데이터패스)<br/>│   │     ├── datapath.sv            <br/>│   │     ├── control_unit.sv        <br/>│   │     ├── ALU.sv                 # 산술 논리 연산 장치<br/>│   │     ├── register_file.sv       # 32bit x 32개 레지스터 파일<br/>│   │     ├── register.sv            <br/>│   │     ├── program_counter.sv     # 프로그램 카운터<br/>│   │     ├── extend.sv              # imm값 확장 모듈<br/>│   │     ├── mux_2x1.sv             # ALUSrcMUX, JALRSrcMUX<br/>│   │     ├── mux_5x1.sv             <br/>│   │     ├── pc_adder.sv            # PC 가산기<br/>│   │     ├── adder.sv               # PCADDER, JALADDER<br/>│   │     └── define.sv              # Opcode별 Instruction Type 정의<br/>│   └── 🗂️RAM                        # Data Memory<br/>│   │     └── data_memory.sv        <br/>│   └── 🗂️ROM                       # Instruction Memory<br/>│         └── instruction_memory.sv  <br/>│<br/>└── 📂 Testbench               <br/>    └── 🗂️tb.sv                  # 테스트벤치<br/>\`\`\`<br/><br/>**CPU Core Components**<br/>- **Datapath**: 데이터 흐름 및 연산 경로 제어<br/>- **Control Unit**: 명령어 디코딩 및 제어 신호 생성<br/>- **ALU**: 32비트 산술 논리 연산 장치<br/>- **Register File**: 32개의 32비트 범용 레지스터 (x0-x31)<br/>- **Program Counter**: 명령어 주소 관리<br/>- **Immediate Extension**: 즉시값 부호 확장 및 형태 변환<br/><br/>**Memory System Components**<br/>- **Instruction Memory**: 64개 명령어 저장 가능한 ROM<br/>- **Data Memory**: 128바이트 데이터 저장 가능한 RAM<br/><br/>**Supporting Modules**<br/>- **Multiplexers**: 2:1, 4:1, 5:1 데이터 선택기<br/>- **PC Adder**: 프로그램 카운터 증가 및 분기 주소 계산<br/>- **Adder**: 범용 가산기 (점프 주소 계산용)<br/>- **Register**: 범용 32비트 레지스터 구현`
      },
      {
        title: "3. Key Features",
        description: `**🔧 Processor Features**<br/>- **Single-Cycle Implementation**: 1 clk cycle당 하나의 명령어만 실행<br/>- **Harvard Architecture**: Instruction Mem/Data Mem 분리<br/>- **Jump and Link Support**: JAL/JALR 명령어를 통한 함수 호출 지원<br/>- **Immediate Support**: Type별 다양한 immediate값 형태 지원<br/><br/>**💾 Memory System**<br/>- **Instruction Memory**: 64 × 32-bit ROM<br/>- **Data Memory**: 128 × 8-bit RAM (바이트 주소 지정)<br/>- **Little Endian**: 리틀 엔디안 바이트 순서<br/>- **Variable Width Access**: 8/16/32비트 메모리 접근 지원<br/><br/>**🎯 Control & Datapath**<br/>- **Unified Control Unit**: 모든 명령어 타입에 대한 통합 제어<br/>- **Advanced Multiplexing**: PC 소스 및 레지스터 쓰기 데이터 선택을 위한 5:1 MUX<br/>- **Sign Extension**: 즉시값 부호 확장 처리<br/>- **Branch Resolution**: ALU 기반 분기 조건 판별<br/>- **Jump Support**: JAL/JALR을 위한 전용 주소 계산 경로<br/><br/>**🗃️ ISA Support: RV32I 기본 명령어 세트 구현**<br/><br/>| **Type** | **Instruction** | **Description** | **Operation** |<br/>|----------|-----------------|-----------------|---------------|<br/>| **R-Type** | ADD | Add | rd = rs1 + rs2 |<br/>| | SUB | Subtract | rd = rs1 - rs2 |<br/>| | SLL | Shift Left Logical | rd = rs1 << rs2[4:0] |<br/>| | SLT | Set Less Than | rd = (rs1 < rs2) ? 1 : 0 |<br/>| | SLTU | Set Less Than Unsigned | rd = (rs1 < rs2) ? 1 : 0 (unsigned) |<br/>| | XOR | Exclusive OR | rd = rs1 ^ rs2 |<br/>| | SRL | Shift Right Logical | rd = rs1 >> rs2[4:0] |<br/>| | SRA | Shift Right Arithmetic | rd = rs1 >>> rs2[4:0] |<br/>| | OR | Bitwise OR | rd = rs1 \\| rs2 |<br/>| | AND | Bitwise AND | rd = rs1 & rs2 |<br/>| **I-Type** | ADDI | Add Immediate | rd = rs1 + imm |<br/>| | SLTI | Set Less Than Immediate | rd = (rs1 < imm) ? 1 : 0 |<br/>| | SLTIU | Set Less Than Immediate Unsigned | rd = (rs1 < imm) ? 1 : 0 (unsigned) |<br/>| | XORI | XOR Immediate | rd = rs1 ^ imm |<br/>| | ORI | OR Immediate | rd = rs1 \\| imm |<br/>| | ANDI | AND Immediate | rd = rs1 & imm |<br/>| | SLLI | Shift Left Logical Immediate | rd = rs1 << imm[4:0] |<br/>| | SRLI | Shift Right Logical Immediate | rd = rs1 >> imm[4:0] |<br/>| | SRAI | Shift Right Arithmetic Immediate | rd = rs1 >>> imm[4:0] |<br/>| | JALR | Jump and Link Register | rd = PC + 4, PC = (rs1 + imm) & ~1 |<br/>| **I-Type Load** | LW | Load Word | rd = mem[rs1 + imm][31:0] |<br/>| | LH | Load Halfword | rd = sign_ext(mem[rs1 + imm][15:0]) |<br/>| | LB | Load Byte | rd = sign_ext(mem[rs1 + imm][7:0]) |<br/>| | LHU | Load Halfword Unsigned | rd = zero_ext(mem[rs1 + imm][15:0]) |<br/>| | LBU | Load Byte Unsigned | rd = zero_ext(mem[rs1 + imm][7:0]) |<br/>| **S-Type** | SW | Store Word | mem[rs1 + imm][31:0] = rs2 |<br/>| | SH | Store Halfword | mem[rs1 + imm][15:0] = rs2[15:0] |<br/>| | SB | Store Byte | mem[rs1 + imm][7:0] = rs2[7:0] |<br/>| **B-Type** | BEQ | Branch if Equal | if (rs1 == rs2) PC = PC + imm |<br/>| | BNE | Branch if Not Equal | if (rs1 != rs2) PC = PC + imm |<br/>| | BLT | Branch if Less Than | if (rs1 < rs2) PC = PC + imm |<br/>| | BGE | Branch if Greater or Equal | if (rs1 >= rs2) PC = PC + imm |<br/>| | BLTU | Branch if Less Than Unsigned | if (rs1 < rs2) PC = PC + imm (unsigned) |<br/>| | BGEU | Branch if Greater or Equal Unsigned | if (rs1 >= rs2) PC = PC + imm (unsigned) |<br/>| **U-Type** | LUI | Load Upper Immediate | rd = imm << 12 |<br/>| | AUIPC | Add Upper Immediate to PC | rd = PC + (imm << 12) |<br/>| **J-Type** | JAL | Jump and Link | rd = PC + 4, PC = PC + imm |`
      },
      {
        title: "4. Key Parameters",
        description: `- **Clock Frequency**: 100MHz<br/>- **Register Count**: 32bit x 32개 (x0-x31)<br/>- **Memory Size**:<br/>  - 명령어 메모리: 64 words (256 bytes)<br/>  - 데이터 메모리: 128 bytes<br/>- **Data Width**: 32-bit 데이터 경로`
      }
    ],
    results: "모든 RV32I 명령어(40개)를 성공적으로 구현하고, 테스트벤치를 통해 100% 기능 검증을 완료했습니다. Harvard Architecture를 통한 명령어/데이터 메모리 분리로 효율적인 메모리 접근을 구현했습니다.",
    techStack: ["SystemVerilog", "ModelSim", "RISC-V", "Multi-Cycle Architecture"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/RISC-V_CPU_Multi_Cycle', label: 'Source Code' },
      { type: 'doc', url: './projects/rv32i-cpu/design_specification.pdf', label: '설계 명세서 PDF' }
    ]
  },
  {
    id: "line-buffer-controller",
    title: "VGA Line Buffer Controller",
    period: "2024.11 ~ 2024.12",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "VGA.jpg",
    summary: "영상 처리를 위한 효율적인 Line Buffer 제어 모듈을 설계하여 메모리 사용량을 최소화하면서 실시간 스트리밍 처리를 구현했습니다. Circular Buffer 기반 FIFO와 Gray Code 포인터 관리를 통해 95% 메모리 절감을 달성했습니다.",
    featured: false,
    
    gallery: [
      {
        type: 'image' as const,
        url: "linebuffer_architecture.jpg",
        caption: "Line Buffer FIFO Architecture & AXI-Stream Interface",
      },
      {
        type: 'image' as const,
        url: "pointer_management.jpg", 
        caption: "Gray Code Pointer Management & Handshake Protocol",
      },
      {
        type: 'image' as const,
        url: "linebuffer_performance.jpg",
        caption: "Memory Efficiency Results - 95% Memory Reduction, 60fps Processing",
      }
    ],
    
    overview: `이 프로젝트는 **영상 처리 시스템에 최적화된 Line Buffer Controller** 설계 프로젝트입니다. Circular Buffer 기반 FIFO 구조와 Gray Code 포인터 관리를 통해 기존 Frame Buffer 대비 95% 메모리 절감을 달성했습니다.`,
    
    role: [
      {
        title: "1. Project Objective",
        description: `영상 처리 시스템에서 효율적인 메모리 사용과 실시간 스트리밍 처리를 위한 Line Buffer Controller를 설계합니다. Frame Buffer 대비 메모리 사용량을 최소화하면서 60fps 실시간 처리를 목표로 합니다.`
      },
      {
        title: "2. Project Overview",
        images: ["linebuffer_architecture.jpg"],
        description: `**Block Diagram**<br/><br/>Line Buffer Controller는 다음과 같은 주요 컴포넌트로 구성됩니다:<br/><br/>- **Circular Buffer FIFO**: N-line 버퍼 메모리<br/>- **Write Pointer Controller**: Gray Code 기반 쓰기 포인터 관리<br/>- **Read Pointer Controller**: Gray Code 기반 읽기 포인터 관리<br/>- **AXI-Stream Interface**: 표준 스트리밍 인터페이스<br/>- **Handshake Controller**: Valid/Ready 프로토콜 제어<br/><br/>**Project Hierarchy**<br/>\`\`\`<br/>📁LineBuffer_Controller/<br/>├── 📂 rtl/<br/>│   ├── line_buffer_top.v         # 최상위 모듈<br/>│   ├── circular_fifo.v           # Circular Buffer FIFO<br/>│   ├── write_pointer.v           # Write Pointer Controller<br/>│   ├── read_pointer.v            # Read Pointer Controller<br/>│   ├── gray_converter.v          # Binary ↔ Gray Code 변환<br/>│   ├── axi_stream_interface.v    # AXI-Stream I/F<br/>│   └── handshake_controller.v    # Valid/Ready 제어<br/>├── 📂 tb/<br/>│   └── line_buffer_tb.v          # 테스트벤치<br/>└── 📂 sim/<br/>    └── run.tcl                   # 시뮬레이션 스크립트<br/>\`\`\``
      },
      {
        title: "3. Key Features",
        description: `**🔧 Line Buffer Features**<br/>- **Circular Buffer Structure**: N-line 크기의 효율적인 순환 버퍼 구조<br/>- **Gray Code Pointer**: Clock Domain Crossing 안전성 확보<br/>- **Memory Efficiency**: Frame Buffer 대비 95% 메모리 절감<br/>- **Parameterized Design**: 커널 크기(3x3, 5x5, 7x7) 파라미터 설정 가능<br/><br/>**💾 Memory Management**<br/>- **Line-based Storage**: 전체 프레임이 아닌 필요한 라인만 저장<br/>- **FIFO Control**: Circular Buffer로 연속적인 데이터 흐름 처리<br/>- **Memory Size**: 640×N pixels (N = 커널 크기에 따라 3, 5, 7 라인)<br/>- **Data Width**: 24-bit RGB 픽셀 데이터<br/><br/>**🎯 Interface & Control**<br/>- **AXI-Stream Protocol**: 표준 스트리밍 인터페이스 지원<br/>- **Handshake Protocol**: TVALID/TREADY 기반 흐름 제어<br/>- **Backpressure Support**: 다운스트림 처리 속도에 자동 적응<br/>- **Pointer Collision Prevention**: 안전 마진을 통한 읽기/쓰기 충돌 방지<br/><br/>**🗃️ Performance Metrics**<br/><br/>| **Metric** | **Value** | **Description** |<br/>|----------|-----------------|-----------------|<br/>| **Memory Reduction** | 95% | Frame Buffer 대비 절감률 |<br/>| **Frame Rate** | 60fps | 실시간 처리 속도 |<br/>| **Resolution** | 640×480 | 지원 해상도 |<br/>| **Latency** | 3-7 lines | 커널 크기에 따른 지연 |<br/>| **Clock Frequency** | 100MHz | 동작 주파수 |<br/>| **Data Throughput** | 800Mbps | 최대 데이터 처리량 |`
      },
      {
        title: "4. Key Parameters",
        description: `- **Clock Frequency**: 100MHz<br/>- **Resolution**: 640×480 pixels<br/>- **Data Width**: 24-bit (RGB)<br/>- **Buffer Size**: 640 × N lines (N = 3, 5, or 7)<br/>- **Frame Rate**: 60fps<br/>- **Memory Reduction**: 95% vs Frame Buffer<br/>- **Interface**: AXI-Stream compatible`
      }
    ],
    results: "640x480 영상 처리 시 기존 Frame Buffer 대비 메모리 사용량을 95% 절감했습니다. 최대 60fps 처리 속도를 달성하며 타이밍 제약을 만족했습니다. Gray Code 포인터 관리를 통해 모든 테스트에서 데이터 무결성 100%를 유지했습니다.",
    techStack: ["Verilog", "Vivado", "AXI-Stream"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/line-buffer-controller', label: 'Source Code' },
      { type: 'doc', url: './projects/line-buffer-controller/technical_spec.pdf', label: '기술 명세서 PDF' }
    ]
  },
  {
    id: "uart-protocol",
    title: "UART Protocol Implementation",
    period: "2024.09 ~ 2024.10",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "uart.jpg",
    summary: "Verilog HDL을 사용하여 UART(Universal Asynchronous Receiver-Transmitter) 통신 프로토콜을 구현했습니다.",
    
    // Protocol Project Gallery - Block Diagram, FSM/Timing, Simulation
    gallery: [
      {
        type: 'image' as const,
        url: "uart_block_diagram.jpg",
        caption: "UART System Block Diagram & Architecture",
      },
      {
        type: 'image' as const,
        url: "uart_fsm_timing.jpg", 
        caption: "UART FSM State Diagram & Timing Analysis",
      },
      {
        type: 'gif' as const,
        url: "uart_simulation.gif",
        caption: "UART Communication Simulation Results",
      }
    ],
    
    overview: `비동기 직렬 통신 프로토콜인 UART를 Verilog로 완전 구현했습니다. Configurable baud rate 지원과 parity checking, flow control 기능을 포함하여 산업 표준에 부합하는 견고한 통신 모듈을 설계했습니다.`,
    
    role: [
      {
        title: "UART Transmitter 설계",
        images: [
          "uart_tx_module.jpg"
        ],
        description: `✅Start bit, Data bits(5-9), Parity bit, Stop bit으로 구성된 프레임 구조 구현.<br/><br/>✅Configurable baud rate generator를 통한 다양한 통신 속도 지원.<br/><br/>✅FIFO 버퍼를 통한 연속 데이터 전송 최적화.`
      },
      {
        title: "UART Receiver 설계",
        description: `✅Start bit detection을 위한 edge detection 및 샘플링 로직 구현.<br/><br/>✅Oversampling(x16) 기법을 통한 정확한 데이터 복구.<br/><br/>✅Parity error, Frame error, Overrun error detection 기능 구현.`,
        images: [
          "uart_rx_module.jpg"
        ]
      },
      {
        title: "Baud Rate Generator 구현",
        description: `✅System clock을 기준으로 한 정확한 baud rate 생성.<br/><br/>✅9600, 19200, 38400, 115200 bps 등 표준 속도 지원.<br/><br/>✅Clock divider를 통한 저전력 설계 최적화.`,
        images: [
          "uart_baud_gen.jpg"
        ]
      }
    ],
    results: "115200 bps에서 99.9% 이상의 데이터 전송 정확도를 달성했으며, 다양한 MCU 및 PC와의 호환성을 검증했습니다.",
    techStack: ["Verilog", "ModelSim", "Quartus", "UART"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/UART_Protocol', label: 'Source Code' },
      { type: 'doc', url: './projects/uart/protocol_spec.pdf', label: 'Protocol Specification' }
    ]
  },
  {
    id: "i2c-protocol",
    title: "I2C Protocol Implementation",
    period: "2024.10 ~ 2024.11",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "i2c.jpg",
    summary: "Verilog HDL을 사용하여 I2C(Inter-Integrated Circuit) 프로토콜의 Master/Slave 모듈을 구현했습니다.",
    
    // Protocol Project Gallery - Block Diagram, FSM/Timing, Simulation
    gallery: [
      {
        type: 'image' as const,
        url: "i2c_block_diagram.jpg",
        caption: "I2C Master/Slave Architecture & Bus Topology",
      },
      {
        type: 'image' as const,
        url: "i2c_fsm_timing.jpg", 
        caption: "I2C Protocol FSM & Detailed Timing Diagram",
      },
      {
        type: 'gif' as const,
        url: "i2c_simulation.gif",
        caption: "Multi-device I2C Communication Simulation",
      }
    ],
    
    overview: `동기식 2-wire 통신 프로토콜인 I2C를 완전 구현했습니다. Master/Slave 모드를 모두 지원하며, Multi-master 환경에서의 bus arbitration과 collision detection 기능을 포함한 완전한 I2C 통신 시스템을 구현했습니다.`,
    
    role: [
      {
        title: "I2C Master Controller 설계",
        images: [
          "i2c_master.jpg"
        ],
        description: `✅Start/Stop condition 생성 및 Clock stretching 지원.<br/><br/>✅7-bit/10-bit addressing mode 지원 및 Read/Write 동작 구현.<br/><br/>✅ACK/NACK handling 및 error recovery 메커니즘 구현.`
      },
      {
        title: "I2C Slave Controller 설계",
        description: `✅Address matching 및 General call address 지원.<br/><br/>✅Clock synchronization 및 data hold time 보장.<br/><br/>✅Slave mode에서의 Clock stretching 및 Early termination 처리.`,
        images: [
          "i2c_slave.jpg"
        ]
      },
      {
        title: "Bus Arbitration 구현",
        description: `✅Multi-master 환경에서의 SDA line monitoring 및 collision detection.<br/><br/>✅Priority-based arbitration 및 bus recovery 메커니즘.<br/><br/>✅SCL synchronization을 통한 clock stretching 지원.`,
        images: [
          "i2c_arbitration.jpg"
        ]
      }
    ],
    results: "400kHz Fast mode에서 stable한 통신을 구현했으며, 최대 8개 디바이스가 연결된 multi-slave 환경에서 99% 이상의 통신 성공률을 달성했습니다.",
    techStack: ["Verilog", "ModelSim", "I2C", "Multi-master"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/I2C_Protocol', label: 'Source Code' },
      { type: 'doc', url: './projects/i2c/protocol_spec.pdf', label: 'I2C Specification' }
    ]
  },
  {
    id: "spi-protocol",
    title: "SPI Protocol Implementation",
    period: "2024.11 ~ 2024.12",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "spi.jpg",
    summary: "SystemVerilog HDL을 사용하여 SPI(Serial Peripheral Interface) 프로토콜의 Master/Slave 컨트롤러를 구현했습니다.",
    
    // Protocol Project Gallery - Block Diagram, FSM/Timing, Simulation
    gallery: [
      {
        type: 'image' as const,
        url: "spi_block_diagram.jpg",
        caption: "SPI Master/Slave System Architecture",
      },
      {
        type: 'image' as const,
        url: "spi_fsm_timing.jpg", 
        caption: "SPI Protocol Modes & Timing Characteristics",
      },
      {
        type: 'gif' as const,
        url: "spi_simulation.gif",
        caption: "High-speed SPI Communication Simulation",
      }
    ],
    
    overview: `고속 동기식 통신 프로토콜인 SPI를 완전 구현했습니다. 4가지 클록 모드(CPOL, CPHA) 지원과 다양한 데이터 길이(8/16/32-bit) 처리가 가능하며, multi-slave 선택을 위한 Chip Select 관리 기능을 포함한 완전한 SPI 시스템을 구현했습니다.`,
    
    role: [
      {
        title: "SPI Master Controller 설계",
        images: [
          "spi_master.jpg"
        ],
        description: `✅4가지 SPI 모드(Mode 0-3) 지원 및 configurable clock frequency.<br/><br/>✅Multiple Chip Select 관리 및 daisy-chain 구성 지원.<br/><br/>✅Configurable data width(8/16/32-bit) 및 MSB/LSB first 전송.`
      },
      {
        title: "SPI Slave Controller 설계",
        description: `✅모든 SPI 모드에서의 data sampling 및 setup time 보장.<br/><br/>✅Chip Select 기반 통신 시작/종료 제어.<br/><br/>✅Full-duplex 통신 및 dummy clock 처리 최적화.`,
        images: [
          "spi_slave.jpg"
        ]
      },
      {
        title: "Clock Domain & Timing 최적화",
        description: `✅CPOL/CPHA 설정에 따른 정확한 clock edge detection.<br/><br/>✅Setup/Hold time violation 방지를 위한 timing constraint 설계.<br/><br/>✅고속 통신을 위한 pipeline 구조 및 FIFO 버퍼링.`,
        images: [
          "spi_timing.jpg"
        ]
      }
    ],
    results: "최대 50MHz 클록에서 안정적인 통신을 구현했으며, Flash memory, ADC, DAC 등 다양한 SPI 디바이스와의 호환성을 검증했습니다.",
    techStack: ["Verilog", "ModelSim", "SPI", "High-speed"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/SPI_Protocol', label: 'Source Code' },
      { type: 'doc', url: './projects/spi/protocol_spec.pdf', label: 'SPI Specification' }
    ]
  }
];
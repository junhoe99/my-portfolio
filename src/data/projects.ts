import type { Project, SkillCategory } from '../types';
import { ProjectCategory } from '../types';

export const PROFILE_DATA = {
  name: "김준회 (Junhoe Kim)",
  role: "System Semiconductor Design & Verification Engineer",
  summary: "RTL 설계부터 UVM 검증까지, 하드웨어의 신뢰성을 책임지는 엔지니어입니다. SystemVerilog를 이용한 효율적인 구조 설계와 철저한 검증 환경 구축에 강점이 있습니다.",
  email: "junhoe99@gmail.com",
  phone: "010-4806-2976",
  github: "https://github.com/junhoe99",
  education: "단국대학교 (전자전기공학부)",
  location: "경기도 용인시 수지구",
  resumeUrl: "/resume.pdf", // Placeholder
  awards: [
    {
      title: "미래형 자동차 캡스톤 디자인 경진대회",
      organization: "한국생산제조학회",
      date: "2024.11",
      description: "Ion Battery NDT(Non-Destructive Testing) 시스템 개발 프로젝트로 우수상 수상"
    },
    {
      title: "캡스톤 디자인 경진대회 최우수상",
      organization: "단국대학교",
      date: "2024.12",
      description: "Ion Battery NDT(Non-Destructive Testing) 시스템 개발 프로젝트로 동상 수상"
    }
  ]
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    categoryName: "Languages",
    items: ["Verilog", "SystemVerilog", "C/C++", "Python", "Matlab", "Tcl"]
  },
  {
    categoryName: "Verification",
    items: ["UVM", "Coverage Driven Verification(CDV)", "Assertion (SVA)"]
  },
  {
    categoryName: "EDA Tools & FPGA",
    items: ["Verdi","Vivado", "VCS", "Xilinx FPGA"]
  },
  {
    categoryName: "Protocols",
    items: ["AXI4-Lite", "APB", "I2C", "SPI", "UART"]
  }
];

export const PROJECTS_DATA: Project[] = [
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
    results: "Xilinx Zynq-7000 보드 2대를 사용하여 프레임 드랍 없는 부드러운 게임 플레이를 구현했습니다. 오실로스코프로 I2C SDA/SCL 라인을 측정하여 Timing Violation이 없음을 검증하였으며, 최종 시연에서 99% 이상의 통신 성공률을 달성했습니다.",
    troubleshooting: [
      {
        problem: "I2C 통신 중 ACK 신호가 간헐적으로 누락되는 현상이 발생했습니다.",
        problemImage: "./projects/dual-fpga-pingpong/i2c_problem.gif",
        analysis: "신호 분석 결과, 긴 케이블로 인한 기생 커패시턴스 문제로 SCL의 Rise Time이 지연됨을 확인했습니다. 이로 인해 Slave 디바이스가 ACK 신호를 정상적으로 생성하지 못하는 타이밍 이슈가 발생했습니다.",
        solution: "FPGA 내부의 Pull-up 저항 옵션을 활성화하여 신호 Rise Time을 개선하고, Sampling 로직을 3-stage Synchronizer로 보강하여 메타스테이블리티 문제를 방지했습니다.",
        result: "통신 안정성이 대폭 향상되어 99% 이상의 통신 성공률을 달성했으며, 오실로스코프로 측정한 결과 Timing Violation이 완전히 해소되었습니다.",
        resultImage: "./projects/dual-fpga-pingpong/i2c_solution.gif"
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
    title: "APB System Verification using UVM",
    period: "2025.12.08 ~ 2025.12.14",
    teamSize: "Solo",
    tags: [ProjectCategory.VERIFICATION],
    thumbnail: "p2_pic.jpg",
    summary: "UVM 방법론을 적용하여 AMBA APB 프로토콜 기반의 APB System 검증환경을 구축하였습니다.",
    
    // Personal Project Gallery - Block Diagram, Process, Final Result
    gallery: [
      {
        type: 'image' as const,
        url: "apb_block_diagram.jpg",
        caption: "APB System Architecture & UVM Testbench Block Diagram",
      },
      {
        type: 'gif' as const,
        url: "apb_verification_process.gif", 
        caption: "Constrained Random Test 및 Coverage Collection Process",
      },
      {
        type: 'image' as const,
        url: "apb_coverage_results.jpg",
        caption: "Final Coverage Report - 100% Code Coverage, 95%+ Functional Coverage",
      }
    ],
    
    overview: `UVM(Universal Verification Methodology) 방법론을 적용하여 AMBA APB 프로토콜 기반의 체계적인 검증 환경을 구축했습니다. Constrained Random Testing과 Functional Coverage 기반 검증을 통해 100% Code Coverage와 95% 이상의 Functional Coverage를 달성하여 DUT의 신뢰성을 검증했습니다.`,
    
    role: [
      {
        title: "UVM Testbench Architecture 설계",
        images: [
          "uvm_architecture.jpg"
        ],
        description: `✅**APB_Agent**: APB 프로토콜 기반의 Driver, Monitor, Sequencer를 포함하는 Agent 구성.<br/><br/>✅**Scoreboard**: 예상 결과와 실제 결과를 비교하여 DUT 동작 검증.<br/><br/>✅**Coverage Collector**: Functional Coverage 및 Code Coverage 수집.`
      },
      {
        title: "APB Transaction Level Modeling (TLM) 구현",
        description: `✅APB Read/Write Transaction 클래스 정의 및 Constraint 작성.<br/><br/>✅Address, Data, Control 신호의 랜덤화 및 제약 조건 설정.<br/><br/>✅Protocol Checker를 통한 APB 타이밍 규격 준수 검증.`,
        images: [
          "tlm_sequence.jpg"
        ]
      },
      {
        title: "Functional Coverage 모델 정의 및 수집",
        description: `✅Address Space Coverage: 전체 주소 영역에 대한 커버리지 수집.<br/><br/>✅Data Pattern Coverage: 다양한 데이터 패턴(0x00, 0xFF, Random) 커버리지.<br/><br/>✅Protocol Coverage: READ/WRITE 시퀀스, Error Response 시나리오 커버리지.`,
        images: [
          "coverage_model.jpg"
        ]
      },
      {
        title: "Constrained Random Sequence 작성",
        description: `✅**Random_Sequence**: 기본적인 랜덤 READ/WRITE 트랜잭션 생성.<br/><br/>✅**Burst_Sequence**: 연속된 주소에 대한 버스트 액세스 시퀀스.<br/><br/>✅**Error_Sequence**: 잘못된 주소나 프로토콜 위반 시나리오 테스트.`,
        images: [
          "sequence_diagram.jpg"
        ]
      }
    ],
    results: "100% Code Coverage 및 95% 이상의 Functional Coverage를 달성했습니다. Corner Case(Reset 직후 트랜잭션, 연속 Write/Read 등)에서 발생한 DUT의 오동작 버그 3건을 발견하고 수정 제안서를 작성했습니다.",
    troubleshooting: [
      {
        problem: "Scoreboard에서 Write Response와 Read Data를 비교하는 과정에서 Out-of-order 트랜잭션 처리에 어려움이 있었습니다.",
        problemImage: "./projects/axi4-lite-uvm/scoreboard_issue.png",
        analysis: "AXI4-Lite는 In-order 처리가 원칙이지만, 테스트벤치의 비교 로직이 순차적 데이터 매칭만 가능하여 다양한 테스트 시나리오 검증에 제약이 있었습니다.",
        solution: "Associative Array를 활용한 예상 결과 큐(Queue) 관리 시스템을 도입했습니다. 트랜잭션 ID 매칭 없이도 순차적 데이터 무결성을 검증할 수 있도록 로직을 개선했습니다.",
        result: "테스트 환경의 유연성이 크게 향상되어 다양한 Corner Case를 효율적으로 검증할 수 있게 되었고, 버그 3건을 발견하는 성과를 거두었습니다.",
        resultImage: "./projects/axi4-lite-uvm/coverage_report.png"
      }
    ],
    techStack: ["SystemVerilog", "UVM", "VCS", "Verdi"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/axi4-lite-uvm', label: 'Verification Plan' },
      { type: 'doc', url: './projects/axi4-lite-uvm/verification_plan.pdf', label: 'Verification Plan PDF' },
      { type: 'doc', url: './projects/axi4-lite-uvm/presentation.pdf', label: '발표자료 PDF' }
    ]
  },
  {
    id: "rv32i-risc-v-cpu",
    title: "RV32I-RISC-V CPU",
    period: "2025.01.01 ~ 2025.01.20",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "p3_pic.jpg",
    summary: "RISC-V RV32I 명령어 집합을 지원하는 5-stage 파이프라인 CPU를 SystemVerilog로 설계하고 구현했습니다.",
    
    // Personal Project Gallery - Block Diagram, Process, Final Result
    gallery: [
      {
        type: 'image' as const,
        url: "riscv_pipeline_diagram.jpg",
        caption: "5-Stage Pipeline CPU Architecture Block Diagram",
      },
      {
        type: 'gif' as const,
        url: "riscv_instruction_execution.gif", 
        caption: "Instruction Execution & Data Forwarding Process",
      },
      {
        type: 'image' as const,
        url: "riscv_performance_results.jpg",
        caption: "Final Performance Results - CPI 1.2, 100% Instruction Accuracy",
      }
    ],
    
    overview: `RISC-V RV32I ISA를 지원하는 5-stage 파이프라인 CPU를 SystemVerilog로 설계 및 구현했습니다. Data Forwarding과 Hazard Detection 메커니즘을 통해 파이프라인 효율성을 극대화하여 평균 CPI 1.2를 달성하고, 모든 RV32I 명령어에 대해 100% 기능적 정확성을 검증했습니다.`,
    
    role: [
      {
        title: "5-Stage Pipeline CPU Architecture 설계",
        images: [
          "pipeline_architecture.jpg"
        ],
        description: `✅**Fetch Stage**: 프로그램 카운터(PC) 관리 및 명령어 메모리 인터페이스.<br/><br/>✅**Decode Stage**: 명령어 디코딩, 레지스터 파일 읽기, 제어 신호 생성.<br/><br/>✅**Execute Stage**: ALU 연산, 분기 조건 판단, 주소 계산.<br/><br/>✅**Memory Stage**: 데이터 메모리 인터페이스, Load/Store 명령 처리.<br/><br/>✅**Write Back Stage**: 연산 결과를 레지스터 파일에 기록.`
      },
      {
        title: "Hazard Detection 및 Data Forwarding 구현",
        description: `✅Data Hazard 검출 및 Forwarding Unit을 통한 파이프라인 stall 최소화.<br/><br/>✅Control Hazard 해결을 위한 Branch Prediction 및 Flush 메커니즘 구현.<br/><br/>✅Load-Use Hazard 처리를 위한 Pipeline Interlock 설계.`,
        images: [
          "hazard_forwarding.jpg"
        ]
      },
      {
        title: "RV32I 명령어 집합 구현",
        description: `✅R-Type Instructions: ADD, SUB, AND, OR, XOR, SLL, SRL, SRA, SLT, SLTU.<br/><br/>✅I-Type Instructions: ADDI, ANDI, ORI, XORI, SLLI, SRLI, SRAI, SLTI, SLTIU.<br/><br/>✅Load/Store Instructions: LW, LH, LB, LBU, LHU, SW, SH, SB.<br/><br/>✅Branch Instructions: BEQ, BNE, BLT, BGE, BLTU, BGEU.<br/><br/>✅Jump Instructions: JAL, JALR.`,
        images: [
          "instruction_set.jpg"
        ]
      },
      {
        title: "종합적인 검증 환경 구축",
        description: `✅**Assembly Test Suite**: 각 명령어별 기능 검증 테스트 케이스.<br/><br/>✅**Pipeline Test**: Hazard 시나리오 및 Data Forwarding 검증.<br/><br/>✅**Performance Test**: CPI(Cycles Per Instruction) 측정 및 최적화 검증.`,
        images: [
          "verification_env.jpg"
        ]
      }
    ],
    results: "모든 RV32I 명령어에 대해 100% 기능적 정확성을 달성했습니다. Data Forwarding을 통해 파이프라인 stall을 80% 이상 감소시켜 평균 CPI 1.2를 달성했습니다.",
    troubleshooting: [
      {
        problem: "Branch 명령어 실행 시 파이프라인에서 잘못된 명령어가 실행되는 Control Hazard 문제가 발생했습니다.",
        problemImage: "./projects/rv32i-cpu/control_hazard.png",
        analysis: "Branch 조건 판단이 Execute Stage에서 이루어지는 동안 후속 명령어들이 이미 Fetch, Decode Stage에 진입하여 잘못된 명령어가 실행되는 현상이 발견되었습니다.",
        solution: "Branch 조건 판단 시 파이프라인 Flush 메커니즘을 구현하고, 간단한 Branch Prediction(Static Not-Taken)을 추가하여 성능 저하를 최소화했습니다.",
        result: "Control Hazard로 인한 잘못된 명령어 실행을 완전히 방지했으며, Branch Prediction을 통해 성능 저하를 50% 이상 개선했습니다.",
        resultImage: "./projects/rv32i-cpu/pipeline_flush.png"
      }
    ],
    techStack: ["SystemVerilog", "ModelSim", "RISC-V", "Pipeline Architecture"],
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
    thumbnail: "p4_pic.jpg",
    summary: "영상 처리를 위한 효율적인 Line Buffer 제어 모듈을 설계하여 메모리 사용량을 최소화하면서 실시간 스트리밍 처리를 구현했습니다.",
    featured: false,
    
    // Personal Project Gallery - Block Diagram, Process, Final Result
    gallery: [
      {
        type: 'image' as const,
        url: "linebuffer_architecture.jpg",
        caption: "Line Buffer FIFO Architecture & AXI-Stream Interface",
      },
      {
        type: 'gif' as const,
        url: "linebuffer_operation.gif", 
        caption: "Real-time Data Flow & Pointer Management Operation",
      },
      {
        type: 'image' as const,
        url: "linebuffer_performance.jpg",
        caption: "Memory Efficiency Results - 95% Memory Reduction, 60fps Processing",
      }
    ],
    
    overview: `영상 처리 시스템에 최적화된 효율적인 Line Buffer Controller를 설계했습니다. Circular Buffer 기반 FIFO 구조와 Gray Code 포인터 관리를 통해 기존 Frame Buffer 대비 95% 메모리 절감을 달성하면서 60fps 실시간 스트리밍 처리를 구현했습니다.`,
    
    role: [
      {
        title: "Line Buffer FIFO 구조 설계 및 구현",
        images: [
          "line_buffer_structure.jpg"
        ],
        description: `✅효율적인 메모리 관리를 위한 Circular Buffer 기반 Line Buffer 구조 설계.<br/><br/>✅영상 스트리밍 처리에 최적화된 FIFO 제어 로직 구현.<br/><br/>✅메모리 사용량을 95% 절감하는 최적화된 버퍼 크기 설계.`,
      },
      {
        title: "Read/Write Pointer 관리 로직 설계", 
        description: `✅Gray Code 기반 포인터 관리로 Clock Domain Crossing 문제 해결.<br/><br/>✅Valid/Ready 핸드셰이크 프로토콜로 데이터 흐름 제어 구현.<br/><br/>✅포인터 충돌 방지를 위한 안전 마진 설계 및 검증.`,
        images: [
          "pointer_management.jpg"
        ]
      },
      {
        title: "파라미터화된 설계 및 AXI-Stream 연동", 
        images: [
          "axi_stream_interface.jpg"
        ],
        description: `✅다양한 커널 크기(3x3, 5x5, 7x7)를 지원하는 파라미터화된 모듈 설계.<br/><br/>✅AXI-Stream 프로토콜 호환 인터페이스 구현으로 시스템 통합성 확보.<br/><br/>✅재사용 가능한 IP 블록으로 설계하여 다양한 영상 처리 시스템에 적용 가능.`
      }
    ],
    results: "640x480 영상 처리 시 기존 Frame Buffer 대비 메모리 사용량을 95% 절감했습니다. 최대 60fps 처리 속도를 달성하며 타이밍 제약을 만족했습니다.",
    troubleshooting: [
      {
        problem: "Line Buffer의 Read/Write 포인터가 충돌하여 데이터 무결성이 깨지는 문제가 발생했습니다.",
        problemImage: "./projects/line-buffer-controller/pointer_collision.gif",
        analysis: "Write와 Read 동작이 동시에 발생할 때 포인터 업데이트 타이밍이 맞지 않아 같은 주소를 참조하거나 오래된 데이터를 읽는 현상이 발견되었습니다.",
        solution: "Gray Code 기반 포인터 관리를 도입하여 Clock Domain Crossing 문제를 해결하고, Valid/Ready 핸드셰이크 프로토콜로 데이터 흐름을 제어했습니다.",
        result: "모든 테스트 케이스에서 데이터 무결성 100% 유지를 달성했으며, 연속 스트리밍 처리에서도 안정적인 동작을 확인했습니다.",
        resultImage: "./projects/line-buffer-controller/stable_operation.png"
      }
    ],
    techStack: ["Verilog", "Vivado", "AXI-Stream"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/line-buffer-controller', label: 'Source Code' },
      { type: 'doc', url: './projects/line-buffer-controller/technical_spec.pdf', label: '기술 명세서 PDF' }
    ]
  }
];
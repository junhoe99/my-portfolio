import type { Project, SkillCategory } from '../types';
import { ProjectCategory } from '../types';

export const PROFILE_DATA = {
  name: "김준회 (Junhoe Kim)",
  role: "System Semiconductor Design & Verification Engineer",
  summary: "RTL 설계부터 UVM 검증까지, 하드웨어의 신뢰성을 책임지는 엔지니어입니다. SystemVerilog를 이용한 효율적인 구조 설계와 철저한 검증 환경 구축에 강점이 있습니다.",
  email: "junhoe99@naver.com",
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
        description: `✅**ROI_Color_Detector**: 특정 공간(ROI)의 변환을 통해 실시간 RGB 색상을 인식하고, 인식 결과를 생성하는 모듈. 
                      ✅**Color_Result_Manager**: 조명 변화 및 카메라 노이즈로 인한 noise에 대해 노이즈 필터을 적용.`,
      },
      {
        title: "ASCII 패턴 필터 모듈 설계 및 구현", 
        description: `✅실시간 영상에 ASCII 아트 효과를 적용하는 필터 모듈을 설계했습니다.
                      ✅픽셀 밝기값을 8단계로 나누고, 밝기별로 각기 다른 ASCII 패턴을 적용했습니다.`,
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
    id: "axi4-lite-uvm",
    title: "AXI4-Lite Bus Interface Verification",
    period: "2025.05.21 ~ 2025.05.25",
    teamSize: "Team of 4",
    tags: [ProjectCategory.VERIFICATION],
    thumbnail: "p2_pic.jpg",
    summary: "UVM 방법론을 적용하여 AXI4-Lite 프로토콜 기반의 Slave DUT를 검증하는 VIP(Verification IP)를 구축하였습니다.",
    
    // 3-Stage Demo Gallery
    gallery: [
      {
        type: 'gif' as const,
        url: "p2_intro.jpg",
        caption: "UVM Testbench 구조 설계",
      },
      {
        type: 'gif' as const,
        url: "p2_filter.jpg", 
        caption: "Random Transaction 생성 및 Coverage 수집",
      },
      {
        type: 'gif' as const,
        url: "p2_finish.jpg",
        caption: "Bug Detection 및 Coverage 달성 결과",
      }
    ],
    
    overview: `📍 UVM 방법론을 활용하여 체계적인 검증 환경을 구축하고, AXI4-Lite 프로토콜의 신뢰성을 검증합니다.
              📍 Constrained Random 테스트와 Functional Coverage 기반으로 Corner Case까지 철저히 검증했습니다.
              📍 100% Code Coverage와 95% 이상의 Functional Coverage를 달성하여 DUT 버그 3건을 발견했습니다.`,
    
    role: [
      "UVM Testbench Architecture 설계 (Agent, Driver, Monitor, Scoreboard)",
      "AXI4-Lite Transaction Level Modeling (TLM) 구현",
      "Functional Coverage 모델 정의 및 수집",
      "Constrained Random Sequence 작성"
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
    id: "vga-image-processing",
    title: "VGA 기반 실시간 영상 처리 가속기",
    period: "2024.12.01 ~ 2024.12.20",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "p3_pic.jpg",
    summary: "카메라 입력을 받아 Sobel Edge Detection 필터를 FPGA 하드웨어로 가속하여 실시간 출력하는 시스템입니다.",
    
    // 3-Stage Demo Gallery
    gallery: [
      {
        type: 'gif' as const,
        url: "p3_intro.jpg",
        caption: "Camera Interface 초기화 및 영상 입력",
      },
      {
        type: 'gif' as const,
        url: "p3_filter.jpg", 
        caption: "Sobel Edge Detection 필터 적용 과정",
      },
      {
        type: 'gif' as const,
        url: "p3_finish.jpg",
        caption: "실시간 엣지 검출 결과 (60fps)",
      }
    ],
    
    overview: `📍 실시간 영상 처리 시스템으로 카메라 입력 영상에 Sobel Edge Detection을 적용하여 60fps로 출력합니다.
              📍 하드웨어 가속을 통해 소프트웨어 대비 50배 이상의 성능 향상을 달성했습니다.
              📍 Line Buffer 구조를 활용하여 메모리 사용량을 최소화하면서도 실시간 스트리밍 처리를 구현했습니다.`,
    
    role: [
      "CMOS Camera Interface 모듈 설계",
      "3x3 Sobel Filter 연산기 RTL 설계 (Pipeline 구조)",
      "Line Buffer (FIFO)를 활용한 스트리밍 데이터 처리 구조 구현"
    ],
    results: "640x480 해상도 영상에 대해 60fps 실시간 엣지 검출에 성공했습니다. SW 처리 대비 약 50배 이상의 속도 향상을 확인했습니다.",
    troubleshooting: [
      {
        problem: "초기 구현 시 BRAM 사용량이 과도하여 합성이 실패하는 문제가 발생했습니다.",
        problemImage: "./projects/vga-image-processing/memory_usage_before.png",
        analysis: "전체 프레임(640x480 pixels)을 저장하는 Frame Buffer 방식을 사용하면서 메모리 자원이 FPGA 제한을 초과했습니다. Sobel 필터는 3x3 커널만 필요한데 불필요한 데이터를 모두 저장하고 있었습니다.",
        solution: "Frame Buffer 대신 필요한 2줄의 데이터만 저장하는 Line Buffer 구조로 변경했습니다. FIFO를 활용하여 스트리밍 데이터 처리 구조를 구현했습니다.",
        result: "메모리 사용량을 90% 이상 절감하면서도 동일한 성능을 달성했습니다. Timing Constraint도 만족하여 안정적인 60fps 동작을 얻었습니다.",
        resultImage: "./projects/vga-image-processing/memory_usage_after.png"
      }
    ],
    techStack: ["Verilog", "ModelSim", "Cyclone IV"],
    links: [
      { type: 'github', url: 'https://github.com/junhoe99/vga-image-processing', label: 'Source Code' },
      { type: 'doc', url: './projects/vga-image-processing/design_report.pdf', label: '설계 보고서 PDF' }
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
    
    // 3-Stage Demo Gallery
    gallery: [
      {
        type: 'gif' as const,
        url: "p4_intro.jpg",
        caption: "Line Buffer 구조 설계 및 초기화",
      },
      {
        type: 'gif' as const,
        url: "p4_filter.jpg", 
        caption: "Gray Code 포인터 관리 및 데이터 흐름 제어",
      },
      {
        type: 'gif' as const,
        url: "p4_finish.jpg",
        caption: "메모리 효율성 검증 및 성능 테스트 결과",
      }
    ],
    
    overview: `📍 효율적인 Line Buffer 관리로 메모리 사용량을 95% 절감하면서 실시간 스트리밍 처리를 구현했습니다.
              📍 Gray Code 기반 포인터 관리와 Valid/Ready 핸드셰이크로 데이터 무결성을 보장합니다.
              📍 다양한 커널 크기를 지원하는 파라미터화된 설계로 재사용성을 높였습니다.`,
    
    role: [
      "Line Buffer FIFO 구조 설계 및 구현",
      "Read/Write Pointer 관리 로직 설계",
      "다양한 커널 크기(3x3, 5x5) 지원 가능한 파라미터화 설계",
      "AXI-Stream 인터페이스 연동"
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
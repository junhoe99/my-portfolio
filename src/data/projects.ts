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
    title: "I2C 통신 & VGA 기반 Magic Mirror ",
    period: "2025.06.03 ~ 2025.06.12",
    teamSize: "Team of 4",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "https://picsum.photos/800/600?random=1",
    summary: "두 개의 FPGA 보드를 I2C 프로토콜로 연결하여 실시간 상호작용이 가능한 탁구 게임을 RTL로 구현하였습니다.",
    featured: true, // 주요 프로젝트로 표시
    background: "단일 FPGA 내의 설계가 아닌, 보드 간 통신 인터페이스를 직접 설계하고 검증하는 경험이 필요했습니다. I2C 프로토콜의 Master-Slave 동작을 이해하고, 저속 직렬 통신 환경에서의 데이터 동기화 문제를 해결하고자 프로젝트를 기획했습니다.",
    role: [
      "I2C Master/Slave Controller RTL 설계 (Verilog)",
      "VGA Display Controller 구현 (640x480 @ 60Hz)",
      "물리 엔진 로직 구현 (공의 반사각 및 속도 계산)",
      "보드 간 데이터 패킷 구조 설계 및 파싱 로직 구현"
    ],
    results: "Xilinx Zynq-7000 보드 2대를 사용하여 프레임 드랍 없는 부드러운 게임 플레이를 구현했습니다. 오실로스코프로 I2C SDA/SCL 라인을 측정하여 Timing Violation이 없음을 검증하였으며, 최종 시연에서 99% 이상의 통신 성공률을 달성했습니다.",
    troubleshooting: [
      {
        problem: "I2C 통신 중 ACK 신호가 간헐적으로 누락되는 현상이 발생했습니다.",
        problemImage: "", // 이미지 경로는 나중에 추가
        analysis: "신호 분석 결과, 긴 케이블로 인한 기생 커패시턴스 문제로 SCL의 Rise Time이 지연됨을 확인했습니다. 이로 인해 Slave 디바이스가 ACK 신호를 정상적으로 생성하지 못하는 타이밍 이슈가 발생했습니다.",
        solution: "FPGA 내부의 Pull-up 저항 옵션을 활성화하여 신호 Rise Time을 개선하고, Sampling 로직을 3-stage Synchronizer로 보강하여 메타스테이블리티 문제를 방지했습니다.",
        result: "통신 안정성이 대폭 향상되어 99% 이상의 통신 성공률을 달성했으며, 오실로스코프로 측정한 결과 Timing Violation이 완전히 해소되었습니다.",
        resultImage: "" // 이미지 경로는 나중에 추가
      }
    ],
    techStack: ["Verilog", "Xilinx Vivado", "I2C", "VGA"],
    links: [
      { type: 'github', url: 'https://github.com', label: 'Source Code' },
      { type: 'video', url: 'https://youtube.com', label: 'Demo Video' }
    ]
  },
  {
    id: "axi4-lite-uvm",
    title: "AXI4-Lite Bus Interface Verification",
    period: "2025.05.21 ~ 2025.05.25",
    teamSize: "Team of 4",
    tags: [ProjectCategory.VERIFICATION],
    thumbnail: "https://picsum.photos/800/600?random=2",
    summary: "UVM 방법론을 적용하여 AXI4-Lite 프로토콜 기반의 Slave DUT를 검증하는 VIP(Verification IP)를 구축하였습니다.",
    background: "SoC 설계에서 가장 많이 사용되는 AXI4-Lite 프로토콜의 신뢰성을 확보하기 위해, 랜덤 테스트와 커버리지 기반 검증(CDV) 환경을 구축하는 것이 목표였습니다. 단순 Directed Test의 한계를 극복하고자 UVM을 도입했습니다.",
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
        problemImage: "",
        analysis: "AXI4-Lite는 In-order 처리가 원칙이지만, 테스트벤치의 비교 로직이 순차적 데이터 매칭만 가능하여 다양한 테스트 시나리오 검증에 제약이 있었습니다.",
        solution: "Associative Array를 활용한 예상 결과 큐(Queue) 관리 시스템을 도입했습니다. 트랜잭션 ID 매칭 없이도 순차적 데이터 무결성을 검증할 수 있도록 로직을 개선했습니다.",
        result: "테스트 환경의 유연성이 크게 향상되어 다양한 Corner Case를 효율적으로 검증할 수 있게 되었고, 버그 3건을 발견하는 성과를 거두었습니다.",
        resultImage: ""
      }
    ],
    techStack: ["SystemVerilog", "UVM", "VCS", "Verdi"],
    links: [
      { type: 'github', url: 'https://github.com', label: 'Verification Plan' },
      { type: 'doc', url: '#', label: 'Presentation PDF' }
    ]
  },
  {
    id: "vga-image-processing",
    title: "VGA 기반 실시간 영상 처리 가속기",
    period: "2024.12.01 ~ 2024.12.20",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "https://picsum.photos/800/600?random=3",
    summary: "카메라 입력을 받아 Sobel Edge Detection 필터를 FPGA 하드웨어로 가속하여 실시간 출력하는 시스템입니다.",
    background: "SW로 처리할 때 느린 이미지 필터링 연산을 HW 병렬 처리로 가속화하여 그 효율성을 입증하고자 했습니다. Line Buffer 개념을 도입하여 자원 효율적인 설계를 목표로 했습니다.",
    role: [
      "CMOS Camera Interface 모듈 설계",
      "3x3 Sobel Filter 연산기 RTL 설계 (Pipeline 구조)",
      "Line Buffer (FIFO)를 활용한 스트리밍 데이터 처리 구조 구현"
    ],
    results: "640x480 해상도 영상에 대해 60fps 실시간 엣지 검출에 성공했습니다. SW 처리 대비 약 50배 이상의 속도 향상을 확인했습니다.",
    troubleshooting: [
      {
        problem: "초기 구현 시 BRAM 사용량이 과도하여 합성이 실패하는 문제가 발생했습니다.",
        problemImage: "",
        analysis: "전체 프레임(640x480 pixels)을 저장하는 Frame Buffer 방식을 사용하면서 메모리 자원이 FPGA 제한을 초과했습니다. Sobel 필터는 3x3 커널만 필요한데 불필요한 데이터를 모두 저장하고 있었습니다.",
        solution: "Frame Buffer 대신 필요한 2줄의 데이터만 저장하는 Line Buffer 구조로 변경했습니다. FIFO를 활용하여 스트리밍 데이터 처리 구조를 구현했습니다.",
        result: "메모리 사용량을 90% 이상 절감하면서도 동일한 성능을 달성했습니다. Timing Constraint도 만족하여 안정적인 60fps 동작을 얻었습니다.",
        resultImage: ""
      }
    ],
    techStack: ["Verilog", "ModelSim", "Cyclone IV"],
    links: [
      { type: 'github', url: 'https://github.com', label: 'GitHub' }
    ]
  },
  {
    id: "line-buffer-controller",
    title: "VGA Line Buffer Controller",
    period: "2024.11 ~ 2024.12",
    teamSize: "Solo",
    tags: [ProjectCategory.RTL_DESIGN],
    thumbnail: "https://picsum.photos/800/600?random=4",
    summary: "영상 처리를 위한 효율적인 Line Buffer 제어 모듈을 설계하여 메모리 사용량을 최소화하면서 실시간 스트리밍 처리를 구현했습니다.",
    featured: false,
    background: "실시간 영상 처리 시스템에서 전체 프레임을 저장하는 것은 메모리 자원 낭비가 심합니다. 3x3, 5x5 등의 커널 기반 필터링은 몇 줄의 데이터만 필요하므로, Line Buffer 방식으로 메모리 효율성을 극대화하고자 했습니다.",
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
        problemImage: "",
        analysis: "Write와 Read 동작이 동시에 발생할 때 포인터 업데이트 타이밍이 맞지 않아 같은 주소를 참조하거나 오래된 데이터를 읽는 현상이 발견되었습니다.",
        solution: "Gray Code 기반 포인터 관리를 도입하여 Clock Domain Crossing 문제를 해결하고, Valid/Ready 핸드셰이크 프로토콜로 데이터 흐름을 제어했습니다.",
        result: "모든 테스트 케이스에서 데이터 무결성 100% 유지를 달성했으며, 연속 스트리밍 처리에서도 안정적인 동작을 확인했습니다.",
        resultImage: ""
      }
    ],
    techStack: ["Verilog", "Vivado", "AXI-Stream"],
    links: [
      { type: 'github', url: 'https://github.com', label: 'Source Code' }
    ]
  }
];
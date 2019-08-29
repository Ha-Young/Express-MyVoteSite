![Voting](/voting.jpeg)

# Voting Platform

## Development

- 직접 Node/Express/MongoDB를 세팅하여 과제를 시작해주세요.
- [Express Application Generator](https://expressjs.com/en/starter/generator.html)를 이용하여 프로젝트를 구성해보시기를 추천드립니다. 단, 사용하지 않는 코드는 잊지말고 반드시 정리하세요.
- 데이터베이스는 본인 컴퓨터(Local)에 [MongoDB를 설치](https://www.mongodb.com/download-center/community)하시고 [mongoose](https://mongoosejs.com/docs/connections.html)와 함께 사용하여 작업하시면 됩니다.
- UI와 디자인에 제약을 두지 않습니다. 실제 상용화된 서비스라 생각하고 최대한 상식적인 웹을 구현해주시기 바랍니다.
- 클라이언트 쪽 프레임워크는 사용하지 마세요. (i.e. React)

## TODO

### 1. 메인 페이지 (`/`)

- 전체 투표 목록(제목, 생성자, 만료 날짜 및 시간, 진행 중 여부)이 보여야 한다.
- 투표를 클릭할 경우, `/votings/:id`로 이동한다.
- 투표 생성하기 버튼이 있어야 한다.
- 생성하기 버튼을 클릭할 경우, `/votings/new`로 이동한다.

### 2. 투표 페이지 (`/votings/:id`)

- 제목, 생성자, 만료 날짜 및 시간, 진행 중 여부, 투표 선택 사항들이 보여야 한다.
- 투표 목록으로 돌아갈 수 있는 버튼이 있어야 한다.
- 만료된 투표의 경우, 투표 결과를 표기해주어야 한다. (가장 많은 선택을 받은 사항 표기)
- 진행 중인 투표의 경우, 누구든지 투표에 참여할 수 있어야 한다.
- 만료되지 않은 투표는 투표를 하더라도 결과 확인이 불가능하다.

### 3. 투표 생성 페이지 (`/votings/new`)

- 투표 제목, 투표 선택 사항, 생성자 이름, 만료 날짜 및 시간을 입력할 수 있어야 한다.
- 투표 목록으로 돌아갈 수 있는 버튼이 있어야 한다.
- 선택 사항은 반드시 2개 이상이어야 생성이 가능하다.
- 투표를 생성하게 되면 메인 페이지의 전체 투표 목록에 반영되고 누구나 투표가 가능하다.

### 4. 투표 생성 성공 페이지 (`/votings/success`)

- 성공적으로 투표가 생성되었다는 성공 메시지가 표기 되어야 한다.
- 메인 페이지로 돌아갈 수 있는 버튼 혹은 링크가 있어야 한다.

### 5. 투표 생성 실패 페이지 (`/votings/failure`)

- 투표 생성을 하지 못했다는 실패 메시지가 표기 되어야 한다.
- 메인 페이지로 돌아갈 수 있는 버튼 혹은 링크가 있어야 한다.
- 상세 에러 내용(Callstack 정보 등)을 사용자에게 보여주어선 안된다.

### Advanced

- Writing Unit Test
- [Deployment to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)

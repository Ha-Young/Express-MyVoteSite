![Voting](/voting.jpeg)

# Voting Platform

## Development

- 직접 Node/Express/MongoDB를 세팅하여 과제를 시작해주세요.
- [Express Application Generator](https://expressjs.com/en/starter/generator.html)를 이용하여 프로젝트를 구성해보시기를 추천드립니다. **단, 사용하지 않는 코드는 잊지말고 반드시 정리하세요.**
- 데이터베이스는 본인 컴퓨터(Local)나 클라우드를 이용하시고 ODM은 [mongoose](https://mongoosejs.com/docs/connections.html)를 사용하여 작업하시면 됩니다.
- UI와 디자인에 제약을 두지 않습니다. 실제 상용화된 서비스라 생각하고 최대한 상식적인 웹을 구현해주시기 바랍니다.
- 클라이언트 쪽 프레임워크는 사용하지 마세요. (i.e. React)
- 필요에 의해 클라이언트 쪽 자바스크립트를 이용하셔도 괜찮습니다. 예) 간단한 이벤트 처리 및 AJAX

## TODO

아래 나열된 페이지 외에 필요한 Endpoint가 있다고 판단된다면 자유롭게 구현하세요. 단, API Endpoint는 반드시 RESTful하도록 구현하세요.

### 1. 회원가입 페이지 (`/signup`)

- 이메일, 비밀번호, 비밀번호 확인을 입력할 수 있는 화면이 보여야 합니다.
- 비밀번호에 대한 규칙은 스스로 정하셔도 됩니다.
- 회원가입에 실패할 경우, 적절한 오류 메시지 혹은 오류 페이지를 보여주어야 합니다.
- 회원가입에 성공할 경우, 로그인 페이지(`/login`)로 이동해야 합니다.

### 2. 로그인 페이지 (`/login`)

- 이메일과 비밀번호를 이용하여 로그인 할 수 있는 화면이 보여야 합니다.
- 로그인에 성공하면 `/` 페이지로 이동해야 합니다.
- 로그인에 실패하면 `/login` 페이지로 다시 돌아와야 합니다.
- 로그인 하지 않은 사용자는 회원가입 페이지, 로그인 페이지, 투표 목록 페이지(`/`), 투표 상세 페이지(`/votings/:id`) 외의 그 어떤 페이지도 방문할 수 없어야 합니다.

#### Resources

- [cookie-session](https://expressjs.com/en/resources/middleware/cookie-session.html)
- [express-session](https://expressjs.com/en/resources/middleware/session.html)

### 3. 메인 페이지 (`/`)

- 전체 투표 목록(제목, 생성자, 만료 날짜 및 시간, 진행 중 여부)이 보여야 합니다.
- 투표를 클릭할 경우, `/votings/:id`로 이동합니다.
- 투표 생성하기 버튼이 있어야 합니다.
- 생성하기 버튼을 클릭할 경우, `/votings/new`로 이동합니다.
- 내 투표보기 버튼이 있어야 합니다.
- 내 투표보기 버튼을 클릭할 경우, `/my-votings`로 이동합니다.

### 4. 투표 페이지 (`/votings/:id`)

- 제목, 생성자, 만료 날짜 및 시간, 진행 중 여부, 투표 선택 사항들이 보여야 합니다.
- 투표 만료 날짜 및 시간은 현재 날짜와 시간보다 과거일 수 없습니다.
- 투표 목록으로 돌아갈 수 있는 버튼이 있어야 합니다.
- 만료된 투표의 경우, 투표 결과를 표기해주어야 합니다. (가장 많은 선택을 받은 사항 표기)
- 진행 중인 투표의 경우, 누구든지 투표에 참여할 수 있어야 합니다.
- 중복 투표는 불가능합니다.
- 만료되지 않은 투표는 투표를 하더라도 결과 확인이 불가능합니다.
- 단, 투표 생성자는 언제든지 투표 결과를 확인할 수 있습니다.
- 투표 생성자에게는 "삭제" 버튼이 보여야 합니다.
- 투표 생성자가 "삭제"할 경우, 더 이상 투표는 참가할 수 없습니다.
- 투표 생성자라 하더라도 이미 생성한 투표를 수정하는 것은 불가능합니다.
- 로그인하지 않은 사용자가 투표를 시도할 경우, 로그인 페이지로 이동해야 합니다.
- 위 상황에서 로그인하지 않았던 사용자가 로그인 페이지에서 로그인 할 경우, 다시 방문했던 투표 페이지로 돌아와야 합니다.

### 5. 투표 생성 페이지 (`/votings/new`)

- 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
- 투표 목록으로 돌아갈 수 있는 버튼이 있어야 합니다.
- 선택 사항은 반드시 2개 이상이어야 생성이 가능합니다.
- 투표를 생성하게 되면 메인 페이지의 전체 투표 목록에 반영되고 누구나 투표가 가능합니다.
- 투표 생성 직후 사용자는 메인 페이지(`/`)로 이동합니다.

### 6. 내 투표보기 페이지 (`/my-votings`)

- 현재 로그인한 사용자가 만든 투표 목록이 보여야 합니다.
- 전체 투표 목록(제목, 만료 날짜 및 시간, 진행 중 여부)이 보여야 합니다.
- 투표를 클릭할 경우, `/votings/:id`로 이동합니다.

### 7. 투표 생성 성공 페이지 (`/votings/success`)

- 투표 생성 성공 페이지는 필요에 따라 다른 방식으로 대체하여도 괜찮습니다.
- 성공적으로 투표가 생성되었다는 성공 메시지가 표기 되어야 합니다.
- 메인 페이지로 돌아갈 수 있는 버튼 혹은 링크가 있어야 합니다.

### 8. 투표 생성 실패 페이지 (`/votings/error`)

- 투표 생성 실패 페이지는 필요에 따라 다른 방식으로 대체하여도 괜찮습니다.
- 투표 생성을 하지 못했다는 실패 메시지가 표기 되어야 합니다.
- 메인 페이지로 돌아갈 수 있는 버튼 혹은 링크가 있어야 합니다.
- 상세 에러 내용(Stack 정보 등)을 사용자에게 보여주어선 안됩니다.

### Advanced

- Writing Unit Test
- Writing End-to-End Test with [Cypress.io](https://www.cypress.io/)
- Deploying to AWS Elastic Beanstalk (아래 링크는 현재 AWS 설정 방식과 약간의 차이가 있을 수 있습니다.)
  - [Setting up AWS Elastic Beanstalk](https://github.com/vanilla-coding/deploy-with-aws-eb-and-circleci/wiki/Setting-up-AWS-Elastic-Beanstalk)
  - [Installing AWS Elastic Beanstalk CLI](https://github.com/vanilla-coding/deploy-with-aws-eb-and-circleci/wiki/Installing-Elastic-Beanstalk-CLI)
  - [Deploying with AWS Elastic Beanstalk CLI](https://github.com/vanilla-coding/deploy-with-aws-eb-and-circleci/wiki/Deploying-with-Elastic-Beanstalk-CLI)

**AWS Access key ID와 Secret access key는 그 어떤 경우에도 Github/Gitlab 등의 클라우드에 업로드 되서는 안됩니다. 특별히 주의해주세요.**
import { server } from './gql';

server.listen().then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    console.log('Module disposed. ');
    server.stop();
  });
}

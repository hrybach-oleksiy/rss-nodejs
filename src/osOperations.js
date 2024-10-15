import os from 'os';

export function handleOsOperations(args) {
  try {
    switch (args[0]) {
      case '--EOL':
        console.log(JSON.stringify(os.EOL));
        break;

      case '--cpus':
        const cpus = os.cpus();
        if (!cpus || cpus.length === 0) {
          throw new Error('Unable to retrieve CPU information');
        }
        console.log(`Total CPUs: ${cpus.length}`);
        cpus.forEach((cpu, index) => {
          console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000}GHz`);
        });
        break;

      case '--homedir':
        const homeDir = os.homedir();
        if (!homeDir) {
          throw new Error('Unable to retrieve home directory');
        }
        console.log(homeDir);
        break;

      case '--username':
        const userInfo = os.userInfo();
        if (!userInfo || !userInfo.username) {
          throw new Error('Unable to retrieve username');
        }
        console.log(userInfo.username);
        break;

      case '--architecture':
        const arch = os.arch();
        if (!arch) {
          throw new Error('Unable to retrieve architecture');
        }
        console.log(arch);
        break;

      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

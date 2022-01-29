# Mark And Learn

This is a chrome extension that helps you with creating and learning a glossary.

The Mark And Learn extension makes it easy to save words and their translation into a glossary in the browser. All you need to do is to highlight the word and save it, the word will then be translated and stored in the glossary for you to later practice. You don't need to switch tabs and lose your focus!

**Highlight the word**
![Mark the word](images/context.png "Mark the word")

**View your glossary**
![View your glossary](images/popup.png "View your glossary")

**Practice your glossary**
![Practice your glossary](images/practice.png "Practice your glossary")

**Configure the extension**
![Configure the extension](images/options.png "Configure the extension")

## Installation

### Chrome Web Store

Install it from [here](https://chrome.google.com/webstore/detail/mark-and-learn/lpbdbbjfcohnhnhkndnaapannpehngee?hl=sv&authuser=0)

### Install it manually

1. Clone the repo
2. Go to `chrome://extensions` in chrome
3. Click “Load Unpacked Extension”
4. Navigate to the local folder containing the source code

### Configuration

Once the extension is installed, you need to configure it a tiny bit.

First of all, Mark And Learn use [DeepL](https://www.deepl.com/) as the translator engine. DeepL provides a free tier API where one is allowed to translate 500K characters each month. You will need to register for the free tier API to get your API key.

Click the options button, and insert your API key. You can also configure the language that you want to translate from and translate to.

## Post Beta v0.0.2

There are a few things to improve.

1. Make the configuration simpler, it should not be required for the user to get their API key.
2. Improve storage solution.
   1. If the chrome storage is sufficient, go from `local chrome storage` to `synced chrome storage`.
   2. Change to a real database.
3. Error handling and add tests.
4. Release workflow in Github Actions.

# Contribute?

Feel free to create issues and PRs!

## Development setup

[Prettier](https://prettier.io/) is used for formatting the code.

It can be installed by:

```
npm install --save-dev --save-exact prettier
```

Run it by:

```
npx prettier --write .
```

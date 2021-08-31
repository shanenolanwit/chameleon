# chameleon
For converting markdown to LaTeX and PDF

You need to have [pandoc](https://pandoc.org/installing.html) installed on your machine to run this script.

For now the scripts runs against the provided `manual` directory although you can override this using the `TARGET` environment variable

Run
```
npm i
```
This will install the required node modules

Then run
```
npm run start
```
This will create LaTeX and PDF duplicates of the specified directory. The duplicate directory structures should match the original directory structure exactly.

To clean up the records left by the sample provided use
```
npm run clean
```
This will delete the latex and pdf folders



import React from 'react';

const FilePathContext = React.createContext({
  filepath: '',
  setFilepath: (filepath: string) => {
    filepath = filepath;
  },
});

export default FilePathContext;
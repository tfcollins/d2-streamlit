# d2-streamlit

Streamlit component that allows you to draw d2-lang based diagrams

## Installation instructions

```sh
pip install d2-streamlit
```

## Usage instructions

```python
import streamlit as st

from d2 import diagram

diagram('x->y', compilerOptions={'layout': 'elk'}, renderOptions={'theme': 'dark'})

```

## License and attributions

This component is based off the [streamlit-template](https://github.com/streamlit/component-template) and uses [d2.js](https://github.com/terrastruct/d2/tree/master/d2js/js) to compile the images. See their licenses within the deps_licenses folder. This component is licensed under the Mozilla V2.0 license.

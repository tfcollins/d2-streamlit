import streamlit as st
from d2 import diagram

if "renders" not in st.session_state:
    st.session_state['renders'] = 0

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/example.py`

# st.subheader("Component with constant args")

# Create an instance of our component with a constant `name` arg, and
# print its output value.
# num_clicks = my_component("World")
# st.markdown("You've clicked %s times!" % int(num_clicks))

# st.markdown("---")
st.subheader("Component with variable args")

# Create a second instance of our component whose `name` arg will vary
# based on a text_input widget.
#
# We use the special "key" argument to assign a fixed identity to this
# component instance. By default, when a component's arguments change,
# it is considered a new instance and will be re-mounted on the frontend
# and lose its current state. In this case, we want to vary the component's
# "name" argument without having it get recreated.
name_input = st.text_input("Enter a name", value="elk")
name_input2 = st.text_input("Enter a name", value="diamond")
# num_clicks = diagram(name_input, key="foo")
input = """dogs -> cats -> mice: chase
replica 1 <-> replica 2
a -> b: To err is human, to moo bovine {
  source-arrowhead: 1
  target-arrowhead: * {
    shape: %s
  }
}
""" % name_input2
# input = "x->r"
diagram(input, key="foo", compileOptions={"layout": name_input}, renderOptions={})
if st.session_state['renders'] == 0:
    st.session_state['renders'] = 1
    # Force a re-render to update the component's name.
    st.rerun()
# st.markdown("You've clicked %s times!" % int(num_clicks))
st.markdown("You've clicked %s times!" % name_input)

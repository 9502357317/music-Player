import streamlit as st

st.title("Songs Player")
st.write("Enjoy your favorite Telugu songs!")

# Embed the HTML file
st.components.v1.iframe("https://your-deployed-app-url.com", width=800, height=600)
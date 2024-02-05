import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Translate = () => {
  const [inputText, setInputText] = useState("");
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [selectedLanguageKey, setLanguageKey] = useState("");
  const [resultText, setResultText] = useState("");
  const getLanguageSource = () => {
    console.log("inputtext", inputText);
    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })
      .then((response) => {
        setdetectedLanguageKey(response.data[0].language);
      });
  };

  useEffect(() => {
    axios.get("https://libretranslate.de/languages").then((response) => {
      setLanguagesList(response.data);
    });
  }, []);

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  const translateText = () => {
    getLanguageSource();
    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey,
    };
    axios.post("https://libretranslate.de/translate", data).then((response) => {
      console.log(response.data.translatedText);
      setResultText(response.data.translatedText);
    });
  };
  return (
    <>
      <div className="app-header">
        <h2 className="header">Texty Translator</h2>
      </div>
      <div className="app-body">
        <div>
          <Form>
            <Form.Field
              control={TextArea}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type Text to Translate.."
            />
            <select className="language-select" onChange={languageKey}>
              <option>Please Select Language..</option>
              {languagesList.map((language) => {
                return (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                );
              })}
            </select>
          </Form>
          <Form.Field
            control={TextArea}
            placeholder="Your Result Translation.."
            value={resultText}
          />
          <Button color="orange" size="large" onClick={getLanguageSource}>
            <Icon name="translate" />
            detect language
          </Button>{" "}
          <Button color="orange" size="large" onClick={translateText}>
            <Icon name="translate" />
            Translate
          </Button>{" "}
        </div>
      </div>
    </>
  );
};
export default Translate;

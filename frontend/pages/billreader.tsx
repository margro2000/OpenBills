import { NextPage } from "next";
import { Layout } from "../components/navbar/layout";
import { Badge, Button, Card, Grid, Input } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";
import { AbstractCard } from "../components/cards/AbstractCard";
import { OutlineCard } from "../components/cards/OutlineCard";
import { useEffect, useState } from "react";
import { ApiResponse } from "../interfaces";
import {Nav} from '../components/navbar/navbar';
export const fetchData = async () => {
  const response = await fetch("http://127.0.0.1:8000/summarize_bill/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const BillReader: NextPage = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [promptValue, setPromptValue] = useState("");
  const [hackString, setHackString] = useState(`${Math.random()}`);
  const [messages, setMessages] = useState([
    {
      prompt: "What is the point of this bill?",
      response: "this bill is about importing lemons from Guatemala",
    },
    {
      prompt: "Who wrote it?",
      response: "Senator Raskin",
    },
  ]);

  const handlePromptSubmit = () => {
    //TODO send prompt value to server
    //create new message

    const newMessage = {
      prompt: promptValue,
      response: "",
    };

    const promise = new Promise((res) => {
      setTimeout(() => res("this is the response"), 5000);
    }).then((res) => {
      setMessages((messages) => {
        const m_messages = [...messages];
        const messageToEdit = m_messages[m_messages.length - 1];

        messageToEdit.response = res;
        return m_messages;
      });
      setHackString(`${Math.random()}`);
    });

    setMessages((val) => [...val, newMessage]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleFileRemove = () => {
    setFile(null);
  };

  console.log("file", file);
  const handleSubmit = async () => {
    console.log("IM HERE!!");
    if (!file) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://127.0.0.1:8000/summarize_bill/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);

      const result: ApiResponse = await response.json();
      console.log("Result:", result);
      setData(result);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to upload file");
    }
  };

  console.log("data", data);
  console.log("file", file);
  console.log("error", error);

  console.log(messages);
  return (
    <Layout>
         <Nav  />
      <Grid.Container gap={2} css={{ marginTop: '5vh', height: '100vh', padding: '1rem' }}>
      <Card css={{ width: '100%' }}>
            <Card.Body>
                <input type="file" id="fileUpload" hidden onChange={handleFileChange}/>
                <Grid.Container>
                    <Grid style={{paddingLeft: '1rem'}}>
                    {file ? 
                  <Grid>
                  <Badge
                    css={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    color="success"
                    variant="flat"
                    size="sm"
                  >
                    <p>{file.name}</p>
                    <Badge
                      css={{ cursor: 'pointer' }}
                      color="success"
                      variant="flat"
                      size="xs"
                      onClick={handleFileRemove}
                    >
                      x
                    </Badge>
                  </Badge>
                </Grid> :
                    <label htmlFor="fileUpload">
                        <Button color="primary" bordered as="span">
                            Select a File
                        </Button>
                    </label>
                }
                    </Grid>
                    <Grid style={{paddingLeft: '3rem'}}>
                        <Button onClick={handleSubmit}>
                            Upload
                        </Button>
                    </Grid>
                </Grid.Container>
            </Card.Body>
        </Card>
        <Grid
          xs={12}
          sm={6}
          css={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "10px",
          }}
        >
          <Card style={{ height: "100%" }}>
            <Grid.Container
              gap={1}
              alignItems="center"
              style={{ padding: "1rem" }}
            >
              <Grid xs={8}>
                <Input
                  placeholder="Ask a Question"
                  css={{ width: "100%" }}
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                />
              </Grid>
              <Grid xs={4}>
                <Button
                  auto
                  color="gradient"
                  ghost
                  onPress={handlePromptSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid.Container>
            <div className="chatWindow">
              {messages.map((message, i) => {
                console.log("messages updated", messages);
                const { prompt, response } = message;

                //just display message if its not the current one
                //if the current one then display the response in typing format if not empty string
                let jsx;
                if (i !== messages.length - 1) {
                  jsx = (
                    <div key={prompt}>
                      <div>{prompt}</div>
                      <div>{response}</div>
                    </div>
                  );
                } else {
                  //last one
                  jsx = (
                    <div key={prompt}>
                      <div>{prompt}</div>
                      <div key={hackString}>
                        <TypeAnimation
                          sequence={[response]}
                          wrapper="span"
                          speed={50}
                          //  style={{ fontSize: "2em", display: "inline-block" }}
                        />
                      </div>
                    </div>
                  );
                }

                return jsx;
              })}
            </div>
          </Card>
        </Grid>

        <Grid
          xs={12}
          sm={6}
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            height: "100%",
          }}
        >
          <Grid css={{ flex: "1" }}>
            <AbstractCard abstract={data ? data.abstract : ""} />
          </Grid>
          <Grid css={{ flex: "1" }}>
            <OutlineCard outlineText={data ? data.summary : ""} />
          </Grid>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default BillReader;

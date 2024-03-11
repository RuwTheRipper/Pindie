import React from "react";
import "./PreLoader.css";
import Title from "@/app/components/ui/title/Title";
import Section from "@/app/components/ui/section/Section";
import Container from "@/app/components/ui/div/Container";

const PreLoader: React.FC = () => {
    return (
        <Container>
            <Section className={"wrapper"}>
                <Container className={"spinner"}>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </Container>
            </Section>
            <center>
                <Title level={2} className={"white"}>Идёт загрузка данных, пожалуйста подождите!</Title>
            </center>
        </Container>
    );
};

export default PreLoader;

import axios from "axios";
import { API_URL } from "./actions";
import { Matiere } from "@/interfaces/interfaces";

const SOAP_ENDPOINT = `${API_URL}/ws`;
const SOAP_NAMESPACE = "http://spring.com/training/model";
const parser = new DOMParser();

export const createMatiere = async (matiere: Matiere) => {
  const method = "createMatiereRequest";
  const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mod="${SOAP_NAMESPACE}">
    <soapenv:Header/>
    <soapenv:Body>
        <mod:${method}>
            <mod:name>${matiere.name}</mod:name>
        </mod:${method}>
    </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(SOAP_ENDPOINT, soapRequest, {
      headers: {
        "Content-Type": "text/xml",
        SOAPAction: method,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la ressource :", error);
    throw error;
  }
};

export const getAllMatieres = async () => {
  const method = "getMatieresRequest";
  const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mod="${SOAP_NAMESPACE}">
    <soapenv:Header/>
    <soapenv:Body>
        <mod:${method}/>
    </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(SOAP_ENDPOINT, soapRequest, {
      headers: {
        "Content-Type": "text/xml",
        SOAPAction: method,
      },
    });
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    const data = Array.from(xmlDoc.getElementsByTagName("ns2:matieres")).map((node) => ({
      id: node.getElementsByTagName("ns2:id")[0].textContent || "",
      name: node.getElementsByTagName("ns2:name")[0].textContent || "",
    }));
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la ressource :", error);
    throw error;
  }
};

export const getMatiere = async (id: number) => {
  const method = "getMatiereRequest";
  const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mod="${SOAP_NAMESPACE}">
    <soapenv:Header/>
    <soapenv:Body>
        <mod:${method}>
            <mod:id>${id}</mod:id>
        </mod:${method}>
    </soapenv:Body>
    </soapenv:Envelope>
  `;
    
  try {
    const response = await axios.post(SOAP_ENDPOINT, soapRequest, {
      headers: {
        "Content-Type": "text/xml",
        SOAPAction: method,
      },
    });
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    const matiereNode = xmlDoc.getElementsByTagName("ns2:matiere")[0];
    const id = matiereNode ? matiereNode.getElementsByTagName("ns2:id")[0]?.textContent || "" : "";
    const name = matiereNode ? matiereNode.getElementsByTagName("ns2:name")[0]?.textContent || "" : "";
    return { id, name };
  } catch (error) {
    console.error("Erreur lors de la récupération de la ressource :", error);
    throw error;
  }
};

export const updateMatiere = async (id: number, matiere: Matiere) => {
  const method = "updateMatiereRequest";
    const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mod="${SOAP_NAMESPACE}">
        <soapenv:Header/>
        <soapenv:Body>
            <mod:${method}>
                <mod:id>${id}</mod:id>
                <mod:name>${matiere.name} </mod:name>
            </mod:${method}>
        </soapenv:Body>
        </soapenv:Envelope>
    `;

    try {
        const response = await axios.post(SOAP_ENDPOINT, soapRequest, {
        headers: {
            "Content-Type": "text/xml",
            SOAPAction: method,
        },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la ressource :", error);
        throw error;
    }
};


export const deleteMatiere = async (id : number) => {
    const method = 'deleteMatiereRequest';
    const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mod="${SOAP_NAMESPACE}">
        <soapenv:Header/>
        <soapenv:Body>
            <mod:${method}>
                <mod:id>${id}</mod:id>
            </mod:${method}>
        </soapenv:Body>
        </soapenv:Envelope>
    `;
 
    try {
       const response = await axios.post(SOAP_ENDPOINT, soapRequest, {
          headers: {
             'Content-Type': 'text/xml',
             'SOAPAction': method,
          },
       });
       return response.data;
    } catch (error) {
       console.error('Erreur lors de la suppression de la ressource :', error);
       throw error;
    }
 };
 

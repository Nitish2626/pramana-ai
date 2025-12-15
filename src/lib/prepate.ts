import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
});

const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME as string);
export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

export const indexDocument = async (filePath: string) => {
  try {
    const loader = new PDFLoader(filePath, { splitPages: false });
    const doc = await loader.load();
      console.log("docs", doc[0].pageContent, doc.length);
  
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });
    const texts = await splitter.splitText(doc[0].pageContent);
      console.log("texts", texts, texts.length);
  
    const documents = texts.map((chunk) => {
      return {
        pageContent: chunk,
        metadata: doc[0].metadata,
      };
    });
  
    console.log("documents", documents, documents.length);
  
    await vectorStore.addDocuments(documents);
  } catch (error) {
    console.log("pinecone error", error);
  }
};

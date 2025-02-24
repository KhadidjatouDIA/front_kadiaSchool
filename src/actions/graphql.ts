import { gql } from '@apollo/client';

export const LIST_CLASSES = gql`
  query {
    listClasses {
      id
      name
    }
  }
`;

export const DETAIL_CLASSE = gql`
  query getClasseById($id: Int) {
    getClasseById(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_CLASSE = gql`
  mutation createClasse($name: String) {
    createClasse(name: $name) {
      name
    }
  }
`;

export const UPDATE_CLASSE = gql`
  mutation updateClasse($id: Int, $name: String) {
    updateClasse(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_CLASSE = gql`
  mutation deleteClasse($id: Int) {
    deleteClasse(id: $id) {
      id
      name
    }
  }
`;

import { gql } from '@apollo/client';

export const queryCountriesByCode = gql`
  query GetCountriesByCode($code: String) {
    countries(filter: { code: { eq: $code } }) {
      code
      name
      continent {
        code
        name
      }
    }
  }
`;

export const queryCountriesByName = gql`
  query GetCountriesByName($name: String) {
    countries(filter: { name: { regex: $name } }) {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      emoji
      emojiU
    }
  }
`;

import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: './sanity/schemas/schema.js',
  outputPath: './src/utils/sanityTypes.ts',
};

export default config;

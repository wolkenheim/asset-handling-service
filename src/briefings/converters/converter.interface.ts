export interface Converter<SourceType, OutputType> {

    convert(source: SourceType): OutputType
}
export type ILoadingProgressListener = (
    props: {
        loaded: number;
        remaining: number;
    }
) => void;

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.0](https://github.com/jneander/utils-react/compare/v1.3.1...v2.0.0) (2022-12-10)

### ⚠ BREAKING CHANGES

- convert to typescript
- `babel` is no longer used in producing build output. Browser compatibility with this library is
  now the responsibility of the consumer.
- `useStore` and `useUid` are no longer available from this library. They have effectively been
  replaced by hooks available directly from React.

### Miscellaneous Chores

- build using tsc
  ([92873dc](https://github.com/jneander/utils-react/commit/92873dc774fd80cbc1d518509e7b4d9f4974c9ed))
- convert to typescript
  ([8837607](https://github.com/jneander/utils-react/commit/8837607312a65ac60e81d639307be347c33b1205))
- remove two hooks
  ([765a40a](https://github.com/jneander/utils-react/commit/765a40aa4b34b8f014aeb8da8fabebc6b207e091))

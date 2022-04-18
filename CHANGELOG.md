# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [0.1.0] - 2022-04-18
### Added
- Allow to collapse link groups by default with `collapseTree: true`, see 4688ba561dc7152d96bf402efd3ba9c1624a6a98. Implements #456.
- Allow to disable transitions with `transitionEnabled: false`, see 01b07d7921050621561f80532c34567f5407ffde.
- Automatically disable transitions when `prefers-reduced-motion` is set, see dccebea7e1d057e5c9c5a7b8165d5f8c7667fe49.
- Indicate currently active route with `aria-current="true"`, see a1ee97e7b7ac426240265d0410969ebd77350e59.
### Changed
- Update (dev) dependencies.
- Fix typo from `README.md`, remove broken badge, more cleanups.
## [0.0.1]
### Added
- Initial Release

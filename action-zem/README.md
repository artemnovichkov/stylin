# zem

## Usage

Executes zem with arguments listed in the Action's `args`.

```
action "Publish" {
  needs = "Master"
  uses = "artemnovichkov/stylin@master"
  args = "publish"
  secrets = ["ZEM_TOKEN"]
}
```

### Secrets

* `ZEM_TOKEN` - **Optional**. The token to use for authentication with zem. Required for `zem publish`.

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).

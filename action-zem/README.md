# Github Action for zem
This Action for [zem](https://github.com/zeplin/zem) enables arbitrary actions with the zem command-line client, including testing and publishing.

## Usage

Executes zem with arguments listed in the Action's `args`.

```
action "Publish" {
  needs = "Master"
  uses = "artemnovichkov/stylin/action-zem@master"
  args = "publish"
  secrets = ["ZEM_TOKEN"]
}
```

### Secrets

* `ZEM_TOKEN` - **Optional**. The token to use for authentication with zem. Required for `zem publish`.

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).

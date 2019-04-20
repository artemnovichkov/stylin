workflow "Build, Test, and Publish" {
  resolves = [
    "Publish",
  ]
  on = "push"
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Install zem" {
  uses = "actions/npm@master"
  needs = ["Build"]
  args = "install -g zem"
}

action "Test" {
  needs = "Install zem"
  uses = "actions/npm@master"
  args = "test"
}

# Filter for master branch
action "Master" {
  needs = "Test"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish" {
  needs = "Master"
  uses = "actions/npm@master"
  args = "publish"
}

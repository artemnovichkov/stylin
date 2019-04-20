FROM node:10

LABEL version="1.0.0"
LABEL repository="https://github.com/artemnovichkov/stylin/action-zem"
LABEL homepage="https://github.com/artemnovichkov/stylin/action-zem"
LABEL maintainer="Artem Novichkov <novichkoff93@gmail.com>"

LABEL com.github.actions.name="GitHub Action for zem"
LABEL com.github.actions.description="Wraps the zem CLI to enable common zem commands."
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="blue"

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
from flask_restful import abort


class StringValidator:
    def __init__(self, value: str):
        self.value = value

    def StringShouldNotBeEmpty(self):
        self.value.strip()
        if len(self.value) > 1:
            abort(404, message = "String is empty")
        return self

    def StringMustNotIncludeWhitespace(self):
        self.value.strip()
        if self.value.find(' ') != -1:
            abort(404, message = "String should not include whitespace")
        return self

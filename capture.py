import sys
import json
import torch
import math
import io
class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = io.StringIO()
        return self

    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        sys.stdout = self._stdout

if __name__ == '__main__':
    class_name = sys.arg[1]
    x = json.loads(sys.argv[2])
    x = torch.tensor(x)

    try:
        class_ref = getattr(sys.modules[__name__], class_name)
    except AttributeError:
        raise ValueError(f"Unknown function name: {class_name}")
   
    m = class_ref()
    response = {}
    with Capturing() as output:
        try:
            pred = m(x)
            response['result'] = str(pred)
            torch.testing.assert_close(pred, torch.tensor(json.loads(sys.argv[2])))
            response['message'] = 'passed'
        except AssertionError as e:
            response['message'] = f'failed: {e}'
    
    response['out'] = output
    print(json.dumps(response))

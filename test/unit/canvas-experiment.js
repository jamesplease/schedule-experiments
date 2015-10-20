import canvasExperiment from '../../src/canvas-experiment';

describe('canvasExperiment', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(canvasExperiment, 'greet');
      canvasExperiment.greet();
    });

    it('should have been run once', () => {
      expect(canvasExperiment.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(canvasExperiment.greet).to.have.always.returned('hello');
    });
  });
});
